from httpx_oauth.clients.github import GitHubOAuth2

from pinnacle.core.config.settings import oauth_settings

github_oauth_client = GitHubOAuth2(
    oauth_settings.github_oauth_client_id, oauth_settings.github_oauth_client_secret
)
