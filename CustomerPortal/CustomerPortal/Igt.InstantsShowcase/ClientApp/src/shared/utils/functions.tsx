export const userIsIgt = (user: any): boolean => {
  return user?.profile?.name?.toLocaleLowerCase()?.indexOf("igt.com") > -1;
};

export const userCanAnalytics = (userName: string): boolean => {
    const allowedCustomerCodes = ["RI", "VA", "MS", "WV", "NE", "IN"];
    const customerCode = sessionStorage.getItem("customerCode");
    const isValidCustomerCode = allowedCustomerCodes.includes(customerCode || "");
    localStorage.setItem("analytics", isValidCustomerCode.toString());

    return (
        (!userName ||
            (!!userName &&
                userName.toLocaleLowerCase().indexOf("igtt.com") === -1 &&
                userName.toLocaleLowerCase().indexOf("lotterync.net") === -1)) &&
        isValidCustomerCode
    );
};
