require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

// Scoring logic
function scoreProfile(user, repos) {
  let score = 0;
  const breakdown = {};
  const tips = [];

  // Bio (10 pts)
  if (user.bio && user.bio.length > 10) { score += 10; breakdown.bio = 10; }
  else { breakdown.bio = 0; tips.push('Add a meaningful bio to your GitHub profile.'); }

  // Avatar (5 pts)
  if (user.avatar_url && !user.avatar_url.includes('identicons')) { score += 5; breakdown.avatar = 5; }
  else { breakdown.avatar = 0; tips.push('Upload a real profile photo — recruiters notice this.'); }

  // Location (5 pts)
  if (user.location) { score += 5; breakdown.location = 5; }
  else { breakdown.location = 0; tips.push('Add your location to your profile.'); }

  // Blog/Website (5 pts)
  if (user.blog) { score += 5; breakdown.website = 5; }
  else { breakdown.website = 0; tips.push('Link your portfolio or LinkedIn in the website field.'); }

  // Followers (up to 10 pts)
  const followerScore = Math.min(10, Math.floor(user.followers / 5));
  score += followerScore;
  breakdown.followers = followerScore;
  if (followerScore < 5) tips.push('Engage with the community to grow your followers.');

  // Public repos count (up to 10 pts)
  const repoCountScore = Math.min(10, user.public_repos);
  score += repoCountScore;
  breakdown.repoCount = repoCountScore;
  if (user.public_repos < 5) tips.push('Create more public repositories to showcase your work.');

  // Repo quality analysis
  let totalStars = 0;
  let reposWithReadme = 0;
  let reposWithDescription = 0;
  let reposWithTopics = 0;
  const repoInsights = [];

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    if (repo.description) reposWithDescription++;
    if (repo.topics && repo.topics.length > 0) reposWithTopics++;

    const insight = {
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      description: repo.description,
      topics: repo.topics || [],
      url: repo.html_url,
      updatedAt: repo.updated_at,
      action: '',
    };

    // Determine action recommendation
    const monthsOld = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24 * 30);
    if (!repo.description && repo.stargazers_count === 0 && monthsOld > 12) {
      insight.action = 'archive';
    } else if (!repo.description || (repo.topics && repo.topics.length === 0)) {
      insight.action = 'improve';
    } else {
      insight.action = 'good';
    }

    repoInsights.push(insight);
  });

  // Stars score (up to 15 pts)
  const starScore = Math.min(15, totalStars * 2);
  score += starScore;
  breakdown.stars = starScore;
  if (totalStars < 3) tips.push('Star-worthy projects attract recruiters. Add READMEs and demos.');

  // Descriptions (up to 10 pts)
  const descScore = repos.length > 0 ? Math.round((reposWithDescription / repos.length) * 10) : 0;
  score += descScore;
  breakdown.descriptions = descScore;
  if (descScore < 7) tips.push('Add descriptions to all your repositories.');

  // Topics (up to 10 pts)
  const topicScore = repos.length > 0 ? Math.round((reposWithTopics / repos.length) * 10) : 0;
  score += topicScore;
  breakdown.topics = topicScore;
  if (topicScore < 5) tips.push('Add topics/tags to repos so they appear in GitHub searches.');

  // Pinned / active repos bonus (up to 10 pts)
  const recentRepos = repos.filter((r) => {
    const months = (Date.now() - new Date(r.updated_at)) / (1000 * 60 * 60 * 24 * 30);
    return months < 6;
  });
  const activityScore = Math.min(10, recentRepos.length * 2);
  score += activityScore;
  breakdown.activity = activityScore;
  if (activityScore < 4) tips.push('Keep your repos active — push updates regularly.');

  const finalScore = Math.min(100, score);

  let grade = 'D';
  if (finalScore >= 85) grade = 'A+';
  else if (finalScore >= 70) grade = 'A';
  else if (finalScore >= 55) grade = 'B';
  else if (finalScore >= 40) grade = 'C';

  return { score: finalScore, grade, breakdown, tips, repoInsights };
}

app.get('/api/analyze/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [userRes, reposRes] = await Promise.all([
      githubAPI.get(`/users/${username}`),
      githubAPI.get(`/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    const user = userRes.data;
    const repos = reposRes.data;

    const analysis = scoreProfile(user, repos);

    res.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location,
        blog: user.blog,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        html_url: user.html_url,
      },
      ...analysis,
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'GitHub user not found.' });
    }
    if (err.response?.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded. Add a token.' });
    }
    res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
