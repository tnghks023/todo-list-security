import axios from "axios";

const backUrl = import.meta.env.VITE_BACK_URL;

//const backUrl = "http://localhost:8080";
export const api = axios.create({
  baseURL: backUrl,
});

// export async function loginUser(login) {
//   try {
//     const response = await api.post("/login", login);
//     if (response.status >= 200 && response.status < 300) {
//       return response.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

export async function getTodoList() {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
  const body = {};
  try {
    const response = await api.get("/todo", { headers, body });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error");
  }
}

// todo insert
export async function insertTodo(input) {
  const body = {
    todoName: input,
  };

  function success() {
    alert("등록이 완료되었습니다.");
  }

  function fail() {
    alert("등록에 실패했습니다.");
  }

  await httpRequest("POST", backUrl + "/todo", body, success, fail);
}

// todo change
export async function changeCompletedTodo(id) {
  const body = {};

  function success() {
    //alert("수정이 완료되었습니다.");
  }

  function fail() {
    alert("수정에 실패했습니다.");
  }

  await httpRequest("PUT", backUrl + `/todo/${id}`, body, success, fail);
}

// todo delete
export async function deleteTodo(id) {
  const body = {};

  function success() {
    alert("삭제가 완료되었습니다.");
  }

  function fail() {
    alert("삭제에 실패했습니다.");
  }

  await httpRequest("DELETE", backUrl + `/todo/${id}`, body, success, fail);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// HTTP 요청
function httpRequest(method, url, body, success, fail) {
  return axios({
    method: method,
    url: url,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: body,
  })
    .then((response) => {
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        success();
      } else {
        handleTokenRefresh(method, url, body, success, fail);
      }
    })
    .catch((error) => {
      fail();
      // if (error.response && error.response.status === 401) {
      //   fail
      // } else {
      //   fail();
      // }
    });
}

function handleTokenRefresh(method, url, body, success, fail) {
  const refresh_token = getCookie("refresh_token");
  if (refresh_token) {
    return axios({
      method: "POST",
      url: backUrl + "/api/token",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        refreshToken: refresh_token,
      }),
    })
      .then((response) => response.data)
      .then((result) => {
        localStorage.setItem("access_token", result.accessToken);
        httpRequest(method, url, body, success, fail);
      })
      .catch(() => fail());
  } else {
    fail();
  }
}
