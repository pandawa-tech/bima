export default function isMobile() {
    if (typeof window === "undefined") {
        return false;
    }
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        return true;
    } else {
        return false;
    }
}