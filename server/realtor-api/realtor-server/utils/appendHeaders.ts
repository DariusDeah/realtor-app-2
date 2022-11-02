export const appendHeaders = (...headersList: any[]) => {
    const baseHeaders: Record<string, string> = {
        'Access-Control-Allow-Origin': 'https://www.pillow-zillow.com/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    };
    if (headersList) {
        const header = { header: headersList }.header['0'];
        const allHeaders = Object.assign({}, { ...baseHeaders, ...header });
        return { ...allHeaders };
    } else {
        return { ...baseHeaders };
    }
};
