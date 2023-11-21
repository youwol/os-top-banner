import { VirtualDOM, ChildrenLike, AnyVirtualDOM } from '@youwol/rx-vdom'
import { ChildApplicationAPI, isPlatformInstance } from '@youwol/os-core'

/**
 * The YouWol top banner
 *
 * YouWol top banner includes 3 parts, from left to right:
 * *    the YouWol logo with some optional badges ([[BadgeView]])
 * *    a main content: the actions the consuming application wants to expose (some helpers e.g. [[ComboTogglesView]])
 * *    a burger menu with common actions ([[BurgerMenu]])
 *
 */
export class TopBannerView implements VirtualDOM<'div'> {
    static ClassSelector = 'top-banner-view'
    static baseClass = `w-100 position-relative fv-bg-background d-flex fv-text-primary justify-content-between align-self-center  border-bottom ${TopBannerView.ClassSelector}`
    public readonly tag = 'div'
    public readonly class: string
    public readonly style = {
        minHeight: '50px',
        display: 'd-flex',
    }
    public readonly children: ChildrenLike
    public readonly innerView: AnyVirtualDOM = { tag: 'div' }

    /**
     * @params params Parameters
     * @param params.innerView inner view of the top-banner
     */
    constructor(params: { innerView?: VirtualDOM<'div'> }) {
        Object.assign(this, params)
        const instanceId = ChildApplicationAPI.getAppInstanceId()
        const youwolOS = ChildApplicationAPI.getOsInstance()

        if (instanceId && isPlatformInstance(youwolOS)) {
            youwolOS.setTopBannerViews(instanceId, {
                actionsView: this.innerView,
                youwolMenuView: { tag: 'div' },
                userMenuView: { tag: 'div' },
            })
            this.class = 'd-none'
            return
        }
        this.class = TopBannerView.baseClass
        this.children = [params.innerView]
    }
}
