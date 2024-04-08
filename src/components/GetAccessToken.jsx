import { useAuth0 } from "@auth0/auth0-react";
import { callExternalApi } from "../services/external-api.service";

const GetAccessToken =  () => {
  const { getAccessTokenSilently } = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const getProtectedResource = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/protected`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const { data, error } = await callExternalApi({ config });
  
    return {
      data: data || null,
      error,
    };
  };

  const clickHandler = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getProtectedResource(accessToken);
    
  }
  
  return (
    <button onClick={clickHandler}>GetAccessToken</button>
  )
}

export default GetAccessToken