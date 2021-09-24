export const useDeviceType = (): string => {
    return window.outerWidth > 1024
        ? 'Desktop'
        : window.outerWidth <= 1024 && window.outerWidth >= 768
        ? 'Tablet'
        : 'Mobile'
}
