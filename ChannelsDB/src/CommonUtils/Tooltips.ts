namespace CommonUtils.Tooltips{
    export function getMessageOrLeaveText(text:string){
        let message = StaticData.Messages.get(text);
        if(message === void 0){
            return text;
        }

        return message;
    }

    export function hasTooltipText(messageKey:string){
        let message = StaticData.Messages.get(`tooltip-${messageKey}`);
        return (message !== void 0);
    }
}