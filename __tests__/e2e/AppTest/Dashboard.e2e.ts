import { expect, element, by } from 'detox'

describe('Dashboard flow', () => {
  it('should open drawer', async () => {
    const menu = element(by.id('menu'))
    const dashboard = element(by.id('dashboard'))
    const settings = element(by.id('settings'))

    await expect(menu).toBeVisible()
    await menu.tap()

    await expect(dashboard).toBeVisible()
    await expect(settings).toBeVisible()
  })
})
