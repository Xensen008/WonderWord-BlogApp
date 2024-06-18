import React from "react";

function Logo({ textColor = "primary", darkTextColor = "white" }) {
  return (
    <div className="relative flex items-center ">
      <div>
        <svg fill="#000000" width="50px" height="50px" viewBox="-6.08 -6.08 44.16 44.16" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M 22 3.5859375 L 17.478516 8.1074219 L 10.738281 10.035156 C 9.4172813 10.392156 8.3715 11.380547 7.9375 12.685547 L 3.859375 25.273438 L 5.2929688 26.707031 L 6.7265625 28.140625 L 19.320312 24.060547 C 20.618313 23.628547 21.606938 22.581437 21.960938 21.273438 L 23.888672 14.525391 L 28.414062 10 L 22 3.5859375 z M 22 6.4140625 L 25.585938 10 L 23 12.585938 L 19.414062 9 L 22 6.4140625 z M 17.710938 10.125 L 21.875 14.289062 L 20.033203 20.738281 C 19.851203 21.410281 19.349266 21.942156 18.697266 22.160156 L 7.6894531 25.724609 L 13.484375 19.929688 A 2 2 0 0 0 14 20 A 2 2 0 0 0 14 16 A 2 2 0 0 0 12.070312 18.515625 L 6.2753906 24.310547 L 9.8378906 13.310547 C 10.057891 12.649547 10.590391 12.148891 11.275391 11.962891 L 17.710938 10.125 z"></path>
          </g>
        </svg>
      </div>
      <div
        className={`text-2.5xl font-bold tracking-widest text-theme-color
rounded-lg focus:outline-none focus:shadow-outline`}
      >
        Wonder
        <span className={"text-black "}>
          Words
        </span>
      </div>
    </div>
  );
}

export default Logo;