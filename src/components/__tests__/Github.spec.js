import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useGithubStore } from '../../stores/github'

describe('Github Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can fetch last week Github most starred repositories', async () => {
    const githubStore = useGithubStore()

    await githubStore.fetchLastWeekMostFavoriteRepos()
    const result = githubStore.getLastWeekMostFavoriteRepos(1)

    expect(result.items.length > 0)
  })

  it('can check if a repo has starred', async () => {
    const githubStore = useGithubStore()
    await githubStore.resetStars()
    await githubStore.fetchLastWeekMostFavoriteRepos()
    const list = githubStore.getLastWeekMostFavoriteRepos(1)

    expect(githubStore.hasStar(list.items[0].id)).toBe(false)

    githubStore.toggleStar(list.items[0].id)

    expect(githubStore.hasStar(list.items[0].id)).toBe(true)

    githubStore.toggleStar(list.items[0].id)

    expect(githubStore.hasStar(list.items[0].id)).toBe(false)
  })

  it('can filter to show only starred repos', async () => {
    const githubStore = useGithubStore()
    await githubStore.resetStars()
    await githubStore.fetchLastWeekMostFavoriteRepos()

    const list = githubStore.getLastWeekMostFavoriteRepos(1)

    expect(githubStore.getLastWeekMostFavoriteRepos(2).items.length).toBe(0)

    githubStore.toggleStar(list.items[0].id)

    expect(githubStore.getLastWeekMostFavoriteRepos(2).items.length).toBe(1)
  })
})
