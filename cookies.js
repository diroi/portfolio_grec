window.addEventListener("load", (event) => {
    if (!getCookie("date") || !getCookie("loc") || !getCookie("ip")) {
      createCookie();
    }
  });
  
  function createCookie() {
    const date = new Date();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = JSON.stringify(position.coords);
          const ip = fetch("https://checkip.amazonaws.com/")
            .then((res) => res.text())
            .then((ip) => ip.trim());
  
          document.cookie = `date=${encodeURIComponent(date)}; loc=${encodeURIComponent(loc)}; ip=${encodeURIComponent(ip)}; path=/`;
          return document.cookie
        },
        (error) => {
          console.log(`Error getting location: ${error.message}`);
          const loc = "Error: " + error.message;
          document.cookie = `date=${encodeURIComponent(date)}; loc=${encodeURIComponent(loc)}; ip=${encodeURIComponent("")}; path=/`;
          
        }
      );
    } else {
      const loc = "Geolocation not supported";
      document.cookie = `date=${encodeURIComponent(date)}; loc=${encodeURIComponent(loc)}; ip=${encodeURIComponent("")}; path=/`;
      return document.cookie
    }
  }
  
  function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        const cookieValue = cookie.substring(cookieName.length + 1);
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

