/**
 * Service Class for the Toast messages on the bottom right of the screen
 * @author: ooemperor
 */
import {ReactNode} from "react";
import {Toast} from "../components/Toast";

class ToastService {

    toasts: ReactNode[]

    constructor() {
        this.toasts = [];
    }

    pushToast(title: string, message: string) {
        const toast = Toast(message, title);
        this.toasts.push(toast);
    }

    getToasts() {
        return this.toasts;
    }
}

export const toastService = new ToastService();