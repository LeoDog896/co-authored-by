import { request, gql } from 'graphql-request'

function makeRedirect() {
  const redirectBase = "https://github.com/login/oauth/authorize?client_id=5a0ee65e494d1b98ca1a&redirect_uri=https://leodog896.github.io/co-authored-by/callback&state="

  const bytes = crypto.getRandomValues(new Uint8Array(16))

  const state = btoa(String.fromCharCode(...bytes))

  return redirectBase + state
}

const query = gql`query GetEmail($login: String!) {
  user(login: $login) {
    repositories(
      first: 1
      isFork: false
      orderBy: {field: CREATED_AT, direction: DESC}
    ) {
      edges {
        node {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  edges {
                    node {
                      messageHeadline
                      message
                      url
                      author {
                        email
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

// Gets a username, returns the email address
export async function fetchEmail(login: string): Promise<string> {
    // from the github api
    const response = await request('https://api.github.com/graphql', query)

    return (response as any).user.repositories.edges[0].node.defaultBranchRef.target.history.edges[0].node.author.email;
}