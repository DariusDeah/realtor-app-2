export const appendHeaders = (...headersList: any[]) => {
    const baseHeaders: Record<string, string> = {
        'access-control-allow-origin': 'https://www.pillow-zillow.com/*',
        'content-type': 'application/json',
        'access-control-allow-headers': '*',
        'access-control-allow-methods': 'OPTIONS,POST,GET,PUT,DELETE',
    };
    if (headersList) {
        const header = { header: headersList }.header['0'];
        const allHeaders = Object.assign({}, { ...baseHeaders, ...header });
        return { ...allHeaders };
    } else {
        return { ...baseHeaders };
    }
};
