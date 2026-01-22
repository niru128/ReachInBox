import React from "react";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <GoogleOAuthProvider clientId="1048258533982-nc41h9mm6abvff8bcf21drfo3kg8kgrs.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
)