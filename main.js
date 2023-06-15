(() => {
  // <stdin>
  function trackAdEvent(eventAction, eventLabel, eventValue) {
    console.log(gtag);
    if (!gtag) {
      console.log("no gtag");
      return;
    }
    gtag("event", eventAction, {
      eventLabel,
      eventValue
    });
  }
  function trackAdRedirectClick(eventLabel) {
    trackAdEvent("Click to redirect from ad landing page", eventLabel, 1);
  }
  function trackAdLandingArrived(eventLabel) {
    trackAdEvent("Arrived on ad landing page", eventLabel, 0);
  }
  function trackRedirect(eventLabel) {
    trackAdEvent("Redirect", eventLabel, 1);
  }
  function trackNewsletterSubscribed() {
    fbq("track", "CompleteRegistration");
    trackAdEvent("Subscribed to newsletter", "Subscribed to newsletter", 1);
  }
  function redirectToPage(eventLabel, url) {
    try {
      trackRedirect(eventLabel);
    } catch (e) {
    }
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  }
  function expand() {
    var elm = document.getElementsByClassName("expandable");
    if (elm) {
      console.log(elm);
      elm[0].classList.add("expanded");
    }
  }
  function afterDate() {
    var elms = document.querySelectorAll("[after-date]");
    elms.forEach((elm) => {
      const date = new Date(elm.getAttribute("after-date"));
      const today = new Date();
      if (today < date) {
        elm.classList.add("hidden");
      }
    });
  }
  function beforeDate() {
    var elms = document.querySelectorAll("[before-date]");
    elms.forEach((elm) => {
      const date = new Date(elm.getAttribute("before-date"));
      const today = new Date();
      if (today >= date) {
        elm.classList.add("hidden");
      }
    });
  }
  function submitSignupForm(event, tag = void 0) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    showSignupLoading();
    return postShopifyCustomer(
      formData.get("email"),
      formData.get("first_name"),
      formData.get("last_name"),
      formData.get("tag") || tag
    ).then((r) => {
      console.log(r);
      trackNewsletterSubscribed();
      showSignupSuccess();
    }).catch((err) => console.error(err));
  }
  function postShopifyCustomer(email, firstName, lastName, tag) {
    var params = {
      email,
      firstName,
      lastName,
      tag
    };
    var paramString = encodeURI(
      Object.keys(params).filter((k) => !!params[k]).map((key) => key + "=" + params[key]).join("&")
    );
    return fetch(
      // 'http://127.0.0.1:5001/jonathanrhodes-e228d/us-central1/addShopifyCustomer?'+paramString,
      "https://addshopifycustomer-n6ni3yii7q-uc.a.run.app?" + paramString,
      {
        method: "GET",
        mode: "cors"
      }
    );
  }
  function showSignupSuccess() {
    var elm = document.getElementsByClassName("signup-form");
    if (elm) {
      for (el of elm) {
        el.classList.add("signup-success");
        el.classList.remove("signup-loading");
      }
    }
  }
  function showSignupLoading() {
    var elm = document.getElementsByClassName("signup-form");
    if (elm) {
      for (el of elm) {
        el.classList.add("signup-loading");
      }
    }
  }
  window.trackAdLandingArrived = trackAdLandingArrived;
  window.trackAdRedirectClick = trackAdRedirectClick;
  window.redirectToPage = redirectToPage;
  window.postShopifyCustomer = postShopifyCustomer;
  window.trackNewsletterSubscribed = trackNewsletterSubscribed;
  window.submitSignupForm = submitSignupForm;
  window.showSignupLoading = showSignupLoading;
  window.showSignupSuccess = showSignupSuccess;
  window.expand = expand;
  afterDate();
  beforeDate();
})();
