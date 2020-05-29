const convertKByte = (kb: number): string => {
    if (kb == null) {
        return null;
    } else if (kb < 1024) {
        return kb + 'KB';
    } else if (kb < 1048576) {
        return Number((kb / 1024).toFixed(2)) + 'MB';
    } else if (kb < 1073741824) {
        return Number((kb / 1048576).toFixed(2)) + 'GB';
    } else if (kb < 1099511627776) {
        return Number((kb / 1073741824).toFixed(2)) + 'TB';
    } else if (kb < 1125899906842624) {
        return Number((kb / 1099511627776).toFixed(2)) + 'PB';
    } else {
        return Number((kb / 1125899906842624).toFixed(2)) + 'EB';
    }
}

const convertByte = (byte: number): string => {
    if (byte == null) {
        return null;
    } else if (byte < 1024) {
        return byte + 'B';
    } else if (byte < 1048576) {
        return Number((byte / 1024).toFixed(2)) + 'KB';
    } else if (byte < 1073741824) {
        return Number((byte / 1048576).toFixed(2)) + 'MB';
    } else if (byte < 1099511627776) {
        return Number((byte / 1073741824).toFixed(2)) + 'GB';
    } else if (byte < 1125899906842624) {
        return Number((byte / 1099511627776).toFixed(2)) + 'TB';
    } else {
        return Number((byte / 1125899906842624).toFixed(2)) + 'PB';
    }
}

const convertMilliSeconds = (seconds: any) => {
    let result = Math.floor(seconds / 1000);
    if (result == null || result <= 0) {
        return '未连接';
    }

    if (result < 60) {
        return result + '秒';
    }

    if (result < 3600) {
        const minutes = Math.floor(result / 60);
        const leftSeconds = result % 60;
        return leftSeconds === 0 ? `${minutes}分` : `${minutes}分${leftSeconds}秒`;
    }

    if (result < 86400) {
        const hours = Math.floor(result / 3600);
        const leftMinutes = Math.floor(result % 3600 / 60);
        const leftSeconds = result % 3600 % 60;
        if (leftSeconds === 0 && leftMinutes === 0) {
            return `${hours}小时`;
        }

        if (leftSeconds === 0 && leftMinutes !== 0) {
            return `${hours}小时${leftMinutes}分`;
        }

        if(leftSeconds !== 0) {
            return `${hours}小时${leftMinutes}分${leftSeconds}秒`;
        }
    }

    if (result >= 86400) {
        const days = Math.floor(result / 86400);
        const leftHours = Math.floor(result % 86400 / 3600);
        const leftMinutes = Math.floor(result % 86400 % 3600 / 60);

        if (leftMinutes === 0 && leftHours === 0) {
            return `${days}天`;
        }

        if (leftMinutes === 0 && leftHours !== 0) {
            return `${days}天${leftHours}小时`;
        }

        if(leftMinutes !== 0) {
            return `${days}天${leftHours}小时${leftMinutes}分`;
        }

    }
}

export {
    convertByte,
    convertKByte,
    convertMilliSeconds
};
