export const dummySignInApi = async (data: object, alldata: any) => {
  if (alldata == null || alldata.length == 0 || (await check(alldata, data))) {
    const response = {
      code: 404,
      message: "No user found with this email, please sign up",
      data: "",
    };
    return response;
  } else {
    const userdata = alldata.filter((i) => i.email == data.email);

    if (userdata[0].password == data.password) {
      const response = {
        code: 200,
        message: "Login successfully",
        data: userdata,
      };
      return response;
    } else {
      const response = {
        code: 403,
        message: "you have entered wrong password",
        data: '',
      };
      return response;
    }
  }
};

const check = async (res: any, data: any) => {
  let flag = false;

  await res.forEach((i) => {
    if (i.email == data.value) {
      flag = true;
    }
  });

  return flag;
};
