
export const notificator = new function (type, message) {
    switch (type) {
        case 'info': this.$toaster.info(message);
            break;
        case 'success': this.$toaster.success(message);
            break;
        case 'warning': this.$toaster.warning(message);
            break;
        case 'error': this.$toaster.error(message);
            break;
    }

};