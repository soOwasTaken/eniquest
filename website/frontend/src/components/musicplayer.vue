<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    version="1.0"
    viewBox="0 0 500 500"
    class="svg-logo"
    @click="goHome()"
  >
    <path
      d="M225.4 76.4c.6 5.8-.9 9.1-3.9 8-1.7-.7-1.8-1.2-1.5-7.7.1-2.6-.1-4.7-.4-4.7-.3 0-2.6 1-5 2.2-3.8 1.8-4.3 2.4-3.3 3.6 2.6 3.3 0 8-3.5 6.1-.9-.5-1.9-.9-2.1-.9-.6 0-3.7 6.6-3.7 7.9 0 .8 4.8 1.1 15 1.1 12 0 15.8-.3 18.3-1.6a13 13 0 0 0 3.8-2.6c.3-.5 1.2-1.1 2-1.2a29 29 0 0 0 5.2-2.1c2.9-1.5 4-1.6 4.9-.7 1.5 1.5.4 2.7-6.5 6.8l-5.2 3-.3 8.2-.3 8.2 5.8-2.7a43 43 0 0 0 6.4-3.6c.3-.5 1-.8 1.5-.8 1.2.2 1.7-7.2.9-13.8-.6-4.9-1.2-6-6.1-10.8-6.8-6.6-8.9-6.9-8.1-1.3.3 2.2.1 4.3-.4 4.6-.5.3-.7.9-.4 1.4.3.4-.2 1.1-1.1 1.4-3 1.1-4.4-1.3-4.4-7.5V71h-8.3l.7 5.4zm6.3 8.2c1.4 2.9.3 3.8-4.2 3.2l-2.7-.3 2.2-2.8c2.6-3.3 3.2-3.4 4.7-.1zm-13.9-.3c2 2.4 1.7 4-.8 4.3-1.4.2-3.2 0-4-.6-1.2-.7-1.2-1.2.4-2.9 2.2-2.4 3-2.6 4.4-.8zm32.8 14c-.5 2.1-4.2 4.7-6.6 4.7-1.7 0-1.1-6.6.8-8.2 4-3.6 7.2-1.7 5.8 3.5z"
    />
    <path
      d="M202 104.2v3.3l14.3-.3c7.8-.2 14.6-.8 15.2-1.3.6-.6.6-1.6-.1-2.7-1-1.5-3.2-1.7-15.3-2l-14.1-.3v3.3z"
    />
    <path
      d="M245.5 113.5c-3.9 2.2-6.1 4.1-6.3 5.4-.2 1.2-.2 2.1.1 2.1 1.8 0 14.3-7.9 14.5-9.3.5-2.4-1.4-2-8.3 1.8z"
    />
    <path
      d="M179.7 120.5c-4.9 2.5-10.2 5.5-11.9 6.7a178 178 0 0 0-22.3 21.8 178.6 178.6 0 0 0-14.9 29c-.2 1.4-1.3 6.3-2.4 11-1.1 4.7-2.3 10.9-2.6 13.8l-.7 5.3 6.3-.3 6.3-.3.1-6.1c.3-11.1 3.5-21.7 11.5-38 1.6-3.2 7.6-10.1 15.4-17.9a73 73 0 0 1 18-15c8.4-4.5 8.5-4.6 8.5-9.7 0-3.2-.4-4.8-1.2-4.7-.7 0-5.3 2-10.1 4.4zm6.1 3.5c-.7 1.1-1.6 2-2.1 2-.4 0-3.6 1.9-7 4.2a150 150 0 0 0-26.5 25.8c-7.8 10.6-16.2 32.9-16.2 43.1 0 2.7-2.2 5.4-3.3 4.2-.4-.3-.7-2.4-.7-4.5 0-11 9.1-35.1 17.8-46.8 7.4-10 19.9-21.1 30.3-26.9 6.6-3.7 9.5-4.1 7.7-1.1z"
    />
    <path
      d="M264.4 117.6c.3.9.6 3.3.6 5.3 0 3.5.3 4 4.2 5.7 17.8 8 35 26.9 44.4 48.9 4 9.2 4.5 11.5 5.1 20.4l.6 9.9 4.6.4c5.7.5 7.3 0 6.7-2.1-.3-.9-.6-4.3-.7-7.6-.2-3.3-.5-6.5-.8-7-.3-.6-.6-2.4-.8-4-.4-7.1-8.6-25.2-16.4-36.3a121.5 121.5 0 0 0-25.3-24.6 21.1 21.1 0 0 0-6.8-4c-.4.3-.8 0-.8-.7s-.3-1-.6-.7c-.3.4-3-.7-6.1-2.3-6.2-3.3-8.8-3.7-7.9-1.3zm13 7.4a97.8 97.8 0 0 1 49.1 73.2c.7 5.7.7 5.8-1.9 5.8-3 0-3.3-.9-3.9-12-.3-4.7-1.2-9.2-2.5-12l-4.2-9.5a20.2 20.2 0 0 0-2.9-5.5c-.4-.3-3.5-4.6-6.8-9.5a92.2 92.2 0 0 0-29.5-28.1c-5.6-3.4-7.2-5.4-4.5-5.4.7 0 3.9 1.4 7.1 3z"
    />
    <path
      d="M202.2 120.2c.2 2.7.7 3.3 2.6 3.2l14.7-.2c12.5-.2 12.5-.2 12.5-2.6 0-1.3-.7-2.7-1.6-3-.9-.3-7.6-.6-15-.6h-13.5l.3 3.2z"
    />
    <path d="M245.8 123.2c-6.3 2.9-8.1 4.9-5.9 6.3 1.4.8 13.5-6 13.9-7.9.5-2.2-.3-2-8 1.6z" />
    <path
      d="M246.3 133.2c-4 2.2-7.3 4.6-7.3 5.4 0 .8.5 1.4 1 1.4 2 0 13.1-6.1 13.6-7.5 1.3-3.3-.5-3.1-7.3.7z"
    />
    <path
      d="M202 135.4c0 1.4.5 2.8 1.1 3.2.6.4 7.2.9 14.5 1.1 11.4.4 13.5.3 14-1 .3-.9.1-2.5-.6-3.6-1-2-1.9-2.1-15-2.1h-14v2.4z"
    />
    <path
      d="m247.6 145.2-4.8 4.1-19.9.1-19.9.1v4.7c0 4.3 1.9 7.7 2.8 5 .5-1.5 3.4-1.6 4.9-.1.6.6.8 2.9.5 5.4-.4 4.2-.4 4.4 3.7 6.4l4.1 2.1v-6.2c0-7.1.9-9.2 3.6-8.6 1.4.2 2 1.3 2.2 4.3.1 2.2.5 5.9.8 8.2.5 4.1.7 4.3 4 4.3h3.4v-7.1c0-8.6 1.2-11.4 4.1-9.8 1.8.9 2 1.9 1.7 7-.2 3.9.1 5.9.8 5.9 1.6 0 10.4-5 10.4-5.9 0-.4-1.1-1.3-2.5-1.9-1.8-.9-2.5-1.9-2.5-4.1 0-1.6.4-3.2.9-3.5 1.7-1.1 5.9 1.3 6.4 3.6.2 1.3.5-2.3.6-8l-.1-10.2c-.2 0-2.5 1.9-5.2 4.2zm1.9 5.9c-.4.5-1.3.9-2.2.9-1.3 0-1.3-.3-.3-1.5 1.3-1.5 3.5-1.1 2.5.6zm-5.5 2.8c-1.5 2.9-2.7 3.3-5.2 2l-2.3-1.2 3-1.3c4.5-2 5.8-1.8 4.5.5zm-9-.1c0 .4-1.4 2-3 3.6l-3 3-2.8-2.7c-3.5-3.3-5.5-3.4-8.4-.3l-2.3 2.5-3.2-2.9c-1.9-1.7-2.7-3-2-3.3 2.1-.7 24.7-.7 24.7.1z"
    />
    <path
      d="M183.2 146a42.5 42.5 0 0 0-9.5 8.2l-5.9 6.2 12.6 12.4c6.9 6.9 12.6 12.7 12.6 12.9 0 .3-1.3.2-2.9-.2-3.8-.8-8.3 2.3-10.4 7.4a72.7 72.7 0 0 0-3.7 14.6c0 .3 2.5.5 5.5.5 4.3 0 5.3-.3 4.9-1.4-.6-1.7 4-11.8 6.2-13.7 1.1-.9 2.3-1 5.2-.1 2.6.8 3.8.9 4.1.1.2-.6 1.7-2.7 3.4-4.6l3-3.5-4.4-3.8a28.5 28.5 0 0 0-6.1-4.5c-1-.4-1.8-1-1.8-1.5s-2.5-3.5-5.6-6.7c-8.1-8.4-8.1-8.5-2.8-12.3l4.5-3.2-2.6-3.3a13.9 13.9 0 0 1-2.5-4.4c0-1.7-1.4-1.3-3.8.9zm2.3 5c.4.6-.5 2.4-1.9 4.1-1.4 1.7-2.6 3.8-2.6 4.7 0 2.9 3.5 7.7 12.4 16.7 10.5 10.7 11 13 2.8 12.7-2.8-.1-4.2.6-7.3 3.7a16.5 16.5 0 0 0-4.5 6.9c-.3 1.7-1.3 3.3-2.1 3.7-1.3.4-1.5-.2-1-3.6.7-5.2 3.4-9.1 7.3-10.4 2.8-1 6.3-4.2 6.4-5.8 0-.5-4.7-5.7-10.5-11.6a65 65 0 0 1-10.5-12.4c0-1.5 8.5-9.7 10.1-9.7.4 0 1.1.5 1.4 1z"
    />
    <path
      d="M276.1 156.9a18 18 0 0 0-3.1 4.7c0 .4-1.6 2.1-3.5 3.9l-3.5 3.1 3.5 3.4c3.4 3.3 3.5 3.3 5.2 1.4 1-1.1 4.7-4.4 8.1-7.4l6.4-5.4-4.1-3.8a18.6 18.6 0 0 0-5-3.8c-.5 0-2.3 1.8-4 3.9zm6.9 4c-.1.3-1 1.7-2.1 3-1.9 2.3-2 2.3-4 .5l-2.1-1.9 2.7-2.3c2.1-1.8 3-2 4.1-1.1.8.6 1.4 1.4 1.4 1.8z"
    />
    <path
      d="M258 176.1a59 59 0 0 1-8.4 6.6l-2.8 1.5 3.1 3.2a22 22 0 0 1 4.2 6.4c.6 1.7 1.5 3.2 2.1 3.2.5 0 .7.3.4.8-.2.4.2 2.2.9 4 1.2 2.8 1.9 3.2 5.3 3.2h3.8l-.2-7c-.1-4.7-.7-7.9-1.9-9.7-1.7-2.6-1.7-2.7.8-4.5l4.8-3.7 2.2-1.8-3.9-3.6c-2.1-2-4.1-3.6-4.4-3.6-.3 0-3 2.3-6 5zm7.5.9c.4.6-.7 2.6-2.4 4.6-3.6 4.1-3.5 3.6-1.6 10.2 1.5 4.9 1.3 7.8-.3 6.8-.4-.2-2.3-3.5-4.2-7.1l-3.5-6.7 5-4.4c5.3-4.6 6-5 7-3.4z"
    />
    <path
      d="M160 172.9c0 .5-1.1 2.7-2.5 4.7s-2.5 4.3-2.5 5c0 .7 2.4 2.5 5.3 4.1 5.7 3.1 5.5 2.4 4.2 13.9l-.8 6.1 4.3.7c5.2.8 6 0 6-6.4 0-2.5.9-6.4 1.9-8.7l1.9-4.2-4.3-3.6c-2.4-1.9-6.4-5.6-8.9-8.1s-4.6-4.1-4.6-3.5zm8.1 12 5.4 4.8-1.8 3.7c-.9 2-1.7 4.8-1.7 6.1 0 1.4-.5 2.5-1.1 2.5-.7 0-.8-1.4-.3-4.3 1.3-7.5.1-10.2-5.8-13.3-2.9-1.5-3.8-4.4-1.5-4.4.7 0 3.8 2.2 6.8 4.9z"
    />
    <path
      d="M292.9 175.6a67.9 67.9 0 0 1-8.7 7.1c-2.9 2-5.1 4.2-4.9 4.7l1.7 4.6c1.2 3.4 1.3 3.5 6.1 3.2 5.4-.4 5.4-.4 3.8-3.4-.8-1.5-.8-2.3.1-3.2 2.3-2.3 4 2.3 4 11.1v8.3h11v-4.3c0-2.3-.8-7.7-1.9-11.9-1-4.3-1.6-8-1.3-8.3.3-.3.1-.5-.4-.5s-1-.9-1.1-2a15 15 0 0 0-2.6-5.4l-2.4-3.6-3.4 3.6zm5 6c1.8 4 4.1 14.4 4.1 18.6 0 6-2.6 4.9-3.4-1.5-1.1-8.5-2.4-11.6-5.3-12.4-2.1-.5-3.1 0-5 2.2-2.2 2.5-2.6 2.6-4 1.3-1.3-1.4-1.1-1.9 2.4-4.4 2.1-1.6 4.7-3.7 5.7-4.7 2.7-2.4 4.1-2.1 5.5.9z"
    />
    <path
      d="M221.7 184.8c-2.7 3-2.1 7.5 1.3 10.5 1.7 1.5 3 3.2 3 3.7 0 2 2.4 1 5.2-2.2 3.5-4 4-11.1.9-12.8-3.1-1.6-8.6-1.2-10.4.8zm8.1 2.5c1.9 1.5 1.5 4.7-.7 4.7-3.3 0-6.4-4.3-4.5-6.3.7-.6 3.3.1 5.2 1.6z"
    />
    <path
      d="M150.5 203.5a81 81 0 0 0 3 31.2c1.4 4.5 3 8.5 3.5 8.8 1.1.7 6.1-1.8 7.9-3.9.9-1 .9-2 .2-3.3a57 57 0 0 1-4.1-25.2c0-11.2-.1-12.1-1.9-12.1-1 0-3.2-.3-4.9-.6l-3-.6-.7 5.7zm6.7.7c.2.7.3 4.1.2 7.6-.2 5.5.7 13 3 23.4.5 2 .2 2.8-.7 2.8-2.4 0-5.7-14-5.7-24.3 0-5.2.3-9.7.7-10 1-1.1 2-.8 2.5.5z"
    />
    <path
      d="M237.6 200.1a35.8 35.8 0 0 0-9.1 15.5c-1.5 5.2-2.6 38.7-1.2 40 .4.4.7-.4.7-1.9 0-4 3.5-11.1 6.8-13.9a47 47 0 0 1 10.2-5.3c6.8-2.6 8.8-4.3 5.3-4.7l-3-.2c-2.2-.2-5.2-3.4-5.9-6.2-.6-2.2-.2-3.2 2-5.1a9.3 9.3 0 0 1 5-2.3c3.3 0 6.9 3.7 6.3 6.6-.5 2.8-.4 2.8 3.3.9 1.8-.9 3.9-3.7 5.9-7.6 4.3-8.6 4.2-8.9-2.8-8.9-7.4 0-13.7 2.2-17.8 6.2l-3.3 3.2v-6.6c0-3.7.4-7.8 1-9.2 1.2-3.1.1-3.3-3.4-.5zm-.6 12c0 1.6.4 2.9.9 2.9 1.5 0 2.3 3.3 1 4.1-1.6.9-.5 7.6 1.6 9.9 1.4 1.5 1.3 1.8-.3 3.3-1 1-2.3 1.7-2.9 1.7-.6 0-2.2.9-3.7 2.1-2.3 1.8-2.7 1.9-3.2.4-1.3-3.3.4-17.9 2.6-23.2 2.4-5.6 4-6.1 4-1.2zm25-.7c0 3.9-6.5 6.1-9 3.1-1.6-1.9-.5-3.1 3-3.8 4.8-.8 6-.7 6 .7z"
    />
    <path
      d="M192.7 208.3c-1.1 2.8 1.3 8.6 6.2 15 3.5 4.6 6.7 7.4 12.7 10.9 4.3 2.6 8.5 5.5 9.1 6.5 1.9 2.5 2.1 1.5 1.1-6.2l-1-8.3c-.1-.6-.5-1.2-1-1.2s-.7-.4-.4-.8c1-1.7-7.1-10.8-11.9-13.4-6.3-3.4-14-4.6-14.8-2.5zm14.5 6.3c4.5 3.2 9.7 9.6 8.1 10.1-.7.3-.4 1.2.8 2.4 1.8 1.8 2.7 5.9 1.2 5.9a37 37 0 0 1-13.3-9c-1.2-1.6-1.8-3-1.4-3 .5 0-.9-1.8-3-3.9-2.3-2.4-3.5-4.4-3.1-5.1 1.1-1.7 6.2-.4 10.7 2.6z"
    />
    <path
      d="M282.8 213c.6 5.5-.8 6.8-6.8 6.6-6.1-.3-7.9.7-12.5 6.7-3 3.9-3.8 6-4.2 10.7-.6 6.6-.5 6.7 7.6 8.5l3.4.7-.5-5.1c-.5-5-.4-5.2 3.8-9.1 2.4-2.2 5-4 5.8-4 4.9 0 10.5 4.7 10.6 8.8 0 2.5-3.3 9.7-5 10.7-1.9 1.2-1 2.3 3.6 4.9l5 2.6c.7 0 7.4-12.8 7.8-15.1.2-1.3.5-2.5.7-2.7l.3-1.1c0-.5.4-1.3.9-1.7 1.6-1.6.4-2.2-5.7-2.9-5.8-.6-6.4-.8-6.1-2.8l1.1-7c.5-3.7.4-5.1-.7-5.8-1-.6-1-.9-.1-.9.7 0 1.2-1.3 1.2-3 0-3-.1-3-5.3-3h-5.3l.4 4zm6.2 5.9c0 7.7-.3 8.1-5.5 6.5-4.3-1.2-4.5-1.2-8.7 1.8-5.6 4-8.6 7.6-9 10.5-.4 3.2-2.2 3-2.6-.3-.5-3.8 1.5-7.9 5.5-11.4 2.6-2.4 4.3-3 7.8-3s4.9-.5 7-2.7c1.4-1.5 2.5-3.6 2.5-4.5 0-1 .7-1.8 1.5-1.8 1.1 0 1.5 1.2 1.5 4.9zm9 17.6c0 2.5-3.1 10.8-4.7 12.3-1 1-1.8 1.1-2.5.4-.7-.7-.3-3.1 1.2-7.6 1.7-5 2.7-6.6 4.1-6.6 1.1 0 1.9.7 1.9 1.5z"
    />
    <path d="M164 221.4c0 3.6 2.3 7.6 4.3 7.6 5.4 0 6.7-1.1 6.7-5.1V220h-5.5c-4 0-5.5.4-5.5 1.4z" />
    <path
      d="M177.8 220.5c-.2.3-.1 2.8.2 5.7.8 6.3 4.4 9.8 10.1 9.8 8.7 0 9.2-9.8.7-14.1-3.4-1.7-9.8-2.6-11-1.4zm11.2 7c1.2 1.3 1.9 2.8 1.5 3.4-1.2 2-5.4 1.2-7.1-1.4-3.4-5.2 1.1-6.8 5.6-2z"
    />
    <path
      d="M126 225.7c0 10.2 10.1 37 17.7 47.1 13 17.3 33.6 32.6 51.2 38.1l6.1 1.9v-6.4c0-5.3-.3-6.6-1.7-7a140.6 140.6 0 0 1-27.4-14.6 93.4 93.4 0 0 1-33.6-53.8c-.3-1.4-.5-4-.4-5.8l.1-3.2h-12v3.7zm9.4 9.2c2.8 13.1 7.6 23 17 35.1a90.7 90.7 0 0 0 35.1 28.7c8 3.7 10.4 5.8 8.9 7.3-1.9 1.9-19.1-6.3-28.7-13.8a165.5 165.5 0 0 1-21.7-22.7 104.5 104.5 0 0 1-14.1-31.7c-2.4-8.6-2.4-10.8 0-10.8 1.5 0 2.1 1.5 3.5 7.9z"
    />
    <path
      d="M320.5 222.8c-1.6.5-2.1 1.7-2.4 5a87.8 87.8 0 0 1-6.9 22.4 106.1 106.1 0 0 1-33 38.2A80 80 0 0 1 255 299c-2.2 0-2.7 2-2.2 8.7l.4 5.1 4-1.4c2.2-.8 4.9-1.4 5.9-1.4 2.6 0 15.7-7 23.3-12.4a104 104 0 0 0 35.9-44.3c3.9-9.1 5-12.6 6.5-19.6l.3-1a49.5 49.5 0 0 1 1.1-8.7c.2-1.1-.8-1.5-3.7-1.7-2.2-.1-4.9.2-6 .5zm5.2 4.9c0 1-.5 4.7-1.3 8.3-5.8 28.1-28.6 56-55.2 67.6-7.8 3.4-11.6 4.2-12.7 2.4-.8-1.2 3-5 5.1-5 2.5 0 15.3-6.9 21.9-11.9 7.4-5.6 19.6-18.3 23.7-24.8 6.7-10.3 13.8-28.2 13.8-34.4 0-2.6 1-3.6 3.6-3.8.6-.1 1.1.7 1.1 1.6z"
    />
    <path
      d="M167.5 233.7c1.6 6.8 9.2 18.3 12 18.3a18 18 0 0 0 5.6-3.6c5.3-4.4 9.1-6.4 12.4-6.4 2.1 0 2.5-.5 2.5-2.8 0-1.6-.6-3.7-1.4-4.7-1.3-1.8-1.4-1.8-2 .2-.8 2.4-6.2 5.3-9.8 5.3-3.2 0-8.6-3.5-10-6.5-.9-2.1-1.8-2.5-5.6-2.5-4.3 0-4.4.1-3.7 2.7zm14.2 8.4c1.3.5 2.3 1.3 2.3 1.9 0 1.1-4.7 3.6-5.4 2.9l-3-4.3c-3.7-5.5-3.4-7.5.6-4.1 1.8 1.5 4.2 3.1 5.5 3.6z"
    />
    <path
      d="M194.9 247.3c-4.7 3.1-6 8.2-3.3 12.8 3.2 5.4 9.4 4.9 9.4-.7 0-1.9.5-2.4 2.5-2.4 2.9 0 7.4 4 7.7 6.7a597.3 597.3 0 0 1 .7 28l.1 24.2 2.8.3 2.7.3V330c0 13.1.1 14 4.4 28 4.8 16.1 6 19.4 6.6 18.9A100.7 100.7 0 0 1 236 346c.6-1.2.9-3.2.6-4.3a126 126 0 0 1-.7-13.7l-.2-11.5 2.6-.3 2.5-.3.1-21.9c.2-23.5 1.1-29.7 5.4-34.4 2.7-3 8.9-5.7 10.7-4.6 1.5 1 .4 3-1.6 3-1.1 0-1.3.6-.8 2.2 1.6 5.5 3.5 5.9 8.3 2 4.8-4.1 5-8.1.6-12.7-11.8-12.6-32.9 3.1-34.3 25.5-.4 6.5-.3 7.3 1 6.2.9-.7 1.8-3.4 2.2-6 2-15.1 10.7-26.1 21-26.5 3.8-.1 4.9.3 6.9 2.7 1.5 1.7 2.3 3.6 2 4.7-.5 1.9-2.5 3.9-2.2 2.2 1-5.5-6.1-8.2-11.9-4.6a16.5 16.5 0 0 0-7.4 8.6c-2.6 5.5-2.8 8.3-3.8 47.9 0 .9-1.1 3-2.5 4.6-2.4 2.8-2.4 3.4-2.4 17.3.1 10.6-.3 15.7-1.5 19.4-.9 2.7-1.6 6.5-1.6 8.3 0 2-.4 3.1-1 2.7-.7-.5-1-13.9-1-40.7.1-22-.1-40.2-.4-40.5-.3-.4-.6-2.1-.6-3.8a44 44 0 0 0-11.9-26.7c-6.5-5.9-13.7-7.2-19.2-3.5zm13.8 3.9c6.6 4.9 10.8 12.6 13.4 24.1.7 3.2 1.6 6 2.1 6.3.4.3.8 15.9.8 34.7l-.1 34.2-2-2.5c-2-2.3-2-3.3-1.4-16.1l.6-13.6-2.8-3.3-2.8-3.4-.6-23c-.6-25.1-1.2-28.3-6.4-32.4-3.7-3-8-2.8-11.1.3-2.8 2.8-4.4 2.5-4.4-.7 0-6.2 8.8-8.9 14.7-4.6z"
    />
    <path
      d="M168.8 251.3a41.7 41.7 0 0 1-4.4 3.3c-1.7 1-1.7 1.2.4 4.1 4.5 6.3 19 18.9 26 22.6 9.4 5 10.2 4.9 10.2-1.1 0-3.5-.5-5.2-2-6.5-1.1-.9-2-1.3-2-.9s-.4.2-.8-.4a104.2 104.2 0 0 1-22.4-20.4l-2.3-3-2.7 2.3zm10.3 12.4c2.2 2.4 4.3 4.3 4.6 4.3.3 0 1.3.8 2.2 1.8.9 1 3.3 2.6 5.3 3.5 3.2 1.5 5.8 4.2 5.8 6.1 0 1.4-6-2-12.5-6.9a55.8 55.8 0 0 1-14.8-14.7c-.9-2.6 1.6-2.9 3.6-.4l5.8 6.3z"
    />
    <path
      d="M269.5 264.1a59 59 0 0 1-10.7 7.2l-4.8 2.2v11.4l3.3-.6c1.7-.3 4.9-1.4 6.9-2.4a98.3 98.3 0 0 0 19.3-13.8c.5-1.3-6.1-9.2-7.5-9-.3 0-3.2 2.3-6.5 5zm9.5 2.7c-.1 2.6-14.3 12.2-18.2 12.2-4.5 0-3.3-2.5 3-6.4 3.1-1.9 7-4.6 8.7-6 2.2-1.8 3.4-2.2 4.7-1.5 1 .5 1.8 1.3 1.8 1.7z"
    />
  </svg>
  <div class="music-page">
    <input
      type="text"
      name="text"
      class="input-player"
      placeholder="Paste the most recent comment under its youtube version."
      v-model="userInput"
      @keyup.enter="confirmInput"
    />
    <button @click="toggleDarkMode" class="dark-mode-toggle">
      {{ darkMode ? '🔆' : '🌙' }}
    </button>
    <header class="page-header">
      <h1>Music as the Art of Expression</h1>
      <p class="instruction1"><span>*</span>discover what song it truly is</p>
    </header>
    <div class="media-player">
      <div class="playlist-button">
        <button @click="togglePlaylist" class="hamburger">≡</button>
        <div v-auto-animate>
          <div v-if="showPlaylist" class="playlist">
            <ul>
              <li v-for="(song, index) in songs" :key="index" @click="playSong(index)">
                <span class="list-song-title">{{ song.title }}</span> -
                <span class="list-song-artist">{{ song.artist }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="player">
        <div class="song-info">
          <img :src="currentSong.image" alt="Current Song Image" class="song-image" />
          <div class="song-details">
            <div>{{ currentSong.title }}</div>
            <div>{{ currentSong.artist }}</div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-time">{{ formattedCurrentTime }}</div>
          <input
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            class="progress-slider"
            @input="seek"
          />

          <div class="duration">{{ formattedDuration }}</div>
          <div
            class="volume"
            style="display: inline-block; position: absolute; transform: translateY(1px)"
          >
            <input @click="toggleVolume" id="checkboxInput" type="checkbox" v-model="muted" />
            <label class="toggleSwitch" for="checkboxInput">
              <div class="speaker">
                <svg viewBox="0 0 75 75" version="1.0" xmlns="http://www.w3.org/2000/svg">
                  <path
                    style="stroke: #fff; stroke-width: 5; stroke-linejoin: round; fill: #fff"
                    d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                  ></path>
                  <path
                    style="fill: none; stroke: #fff; stroke-width: 5; stroke-linecap: round"
                    d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                  ></path>
                </svg>
              </div>

              <div class="mute-speaker">
                <svg stroke-width="5" stroke="#fff" viewBox="0 0 75 75" version="1.0">
                  <path stroke-linejoin="round" fill="#fff" d="m39,14-17,15H6V48H22l17,15z"></path>
                  <path stroke-linecap="round" fill="#fff" d="m49,26 20,24m0-24-20,24"></path>
                </svg>
              </div>
            </label>

            <div class="volume-controls" :class="{ hidden: !showVolumeControls }">
              <input
                type="range"
                min="0"
                max="100"
                v-model="volume"
                class="volume-slider"
                @input="changeVolume"
              />
            </div>
          </div>
        </div>

        <div class="controls">
          <button @click="previousSong" class="prev">⟪</button>
          <button @click="togglePlay" class="play-pause">
            <span class="play-logo">{{ isPlaying ? '⏸︎' : '⏵︎' }}</span>
          </button>
          <button @click="nextSong" class="next">⟫</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { vAutoAnimate } from '@formkit/auto-animate'

import { inject } from 'vue'
import anime from '../../node_modules/animejs/lib/anime.es'
import svgLogo from './svgLogo.vue'
import App2 from '../App2.vue'
// import { getSucceedMusic, setSucceedMusic } from './succeedMusic'

import typetheirfirstalbum from '../assets/music/unknown.mp3'
import brokme from '../assets/music/broke-me-115146.mp3'
import dirtypiano from '../assets/music/dirty-piano-vocal-hip-hop-175870.mp3'
import bouncegone from '../assets/music/bounce-gone-crazy.mp3'
import byenow from '../assets/music/bye-now-marilyn-ford-135787.mp3'
import fox from '../assets/music/foxistance-118353.mp3'
import balloons from '../assets/music/leonell-cassio-chasinx27-balloons-ft-krista-marina-118649.mp3'
import heart from '../assets/music/heart-ft-rfly-141378.mp3'
import pleaseyou from '../assets/music/please-you-marilyn-ford-137328.mp3'
import sayyoubemine from '../assets/music/say-you-be-mine-thebasspapa-3896.mp3'
import stillalive from '../assets/music/still-alive-151278.mp3'
import error from '../assets/errorbruhh.png'
import imagebrokeme from '../assets/newbrokeme.jpg'
import imagedirtypiano from '../assets/rockot-dirtypiano.jpg'
import imagebouncegone from '../assets/boucegonecrazy.jpg'
import imagebyenow from '../assets/ByeNow.jpg'
import imagefox from '../assets/foxistance.jpg'
import imageheart from '../assets/newheart.jpg'
import imageballoons from '../assets/newballoons.png'
import imagepleaseyou from '../assets/newpleaseyou.jpg'
import imagesayyoubemine from '../assets/thebasspapa-sayyoubemine.jpg'
import imagestillalive from '../assets/newstillalive.png'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      darkMode: false,
      showPlaylist: false,
      succeedMusic: false,

      songs: [
        { title: 'Dirty Piano', artist: 'Rockot', image: imagedirtypiano, audio: dirtypiano },
        { title: 'Broke Me', artist: 'HVRDVR', image: imagebrokeme, audio: brokme },
        { title: 'Bye Now', artist: 'Marilyn Ford', image: imagebyenow, audio: byenow },
        { title: 'Foxistance', artist: 'DayFox', image: imagefox, audio: fox },
        {
          title: 'Chasin Balloons',
          artist: 'Leonell Cassio',
          image: imageballoons,
          audio: balloons
        },
        { title: 'Heart', artist: 'Rangga Fermata', image: imageheart, audio: heart },
        { title: 'Bounce Gone Crazy', artist: 'Rockot', image: imagebouncegone, audio: bouncegone },
        { title: '*', artist: '', image: error, audio: typetheirfirstalbum },
        { title: 'Still Alive', artist: 'Snoxxy', image: imagestillalive, audio: stillalive },
        { title: 'Please You', artist: 'Marilyn Ford', image: imagepleaseyou, audio: pleaseyou },
        {
          title: 'Say You Be Mine',
          artist: 'TheBassPapa',
          image: imagesayyoubemine,
          audio: sayyoubemine
        }
      ],
      currentSongIndex: 0,
      audio: new Audio(),
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      volume: 15,
      muted: false,
      previousVolume: null,
      userInput: '',
      succeeded: false,
      changeComponent: inject('changeComponent'),
      router: useRouter(),
      store: useStore()
    }
  },

  computed: {
    currentSong() {
      return this.songs[this.currentSongIndex]
    },
    formattedCurrentTime() {
      return this.formatTime(this.currentTime)
    },
    formattedDuration() {
      return this.formatTime(this.duration)
    }
  },
  methods: {
    toggleDarkMode() {
      const musicPage = document.querySelector('.music-page')
      musicPage.classList.remove('yellow-success')
      this.darkMode = !this.darkMode

      if (this.darkMode) {
        musicPage.classList.add('dark-mode')
      } else {
        musicPage.classList.remove('dark-mode')
      }
    },
    togglePlaylist() {
      this.showPlaylist = !this.showPlaylist
    },
    playSong(index) {
      this.currentSongIndex = index
      this.audio.src = this.currentSong.audio
      this.audio.load()
      this.audio.play()
      this.isPlaying = true
      this.audio.volume = this.volume / 100
    },
    pauseSong(index) {
      this.currentSongIndex = index
      this.audio.src = this.currentSong.audio
      this.audio.load()
      this.audio.pause()
      this.isPlaying = false
      this.audio.volume = this.volume / 100
    },
    togglePlay() {
      if (this.audio.paused) {
        this.audio.play()
        this.isPlaying = true
      } else {
        this.audio.pause()
        this.isPlaying = false
      }
    },
    previousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length
      this.playSong(this.currentSongIndex)
      /* this.isPlaying ? this.playSong(this.currentSongIndex) : this.pauseSong(this.currentSongIndex) */
    },
    nextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length
      this.playSong(this.currentSongIndex)
      /* this.isPlaying ? this.playSong(this.currentSongIndex) : this.pauseSong(this.currentSongIndex) */
    },
    updateTime() {
      this.currentTime = Math.floor(this.audio.currentTime)
    },
    setDuration() {
      this.duration = Math.floor(this.audio.duration)
    },
    seek() {
      this.audio.currentTime = this.currentTime
    },
    changeVolume() {
      this.audio.volume = this.volume / 100
    },
    toggleVolume() {
      this.muted = !this.muted
      if (this.muted) {
        this.previousVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.previousVolume || 100
      }
      this.changeVolume()
    },
    setSucceedMusic(value) {
      this.succeedMusic = value
    },
    getSucceedMusic() {
      return this.succeedMusic
    },
    //     cutVolume() {
    //       this.previousVolume = this.volume
    //       this.volume = 0
    //     },
    //     bringBackVolume() {
    //       if (this.previousVolume !== null) {
    //         this.volume = this.previousVolume // Restore previous volume
    //         this.previousVolume = null // Reset previous volume to null
    //       } else {
    //         this.volume = 30 // If previousVolume is null (no previous volume stored), set volume to default value
    //       }
    //     },
    // 	toggleVolumeControls() {
    //    if (this.audio.volume == 0) this.bringBackVolume()
    //    else this.cutVolume()
    // }
    // ,
    formatTime(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    },

    ///////////////////////////////////////////////////////////
    ////////////////////CHECKING ANSWER/////////////////////////
    /////////////////////////////////////////////////////////
    async confirmInput() {
      try {
        const response = await fetch('/checkOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            game: 'game5',
            order: this.userInput.trim().toLowerCase()
          })
        })
        const data = await response.json()
        console.log(data.feedback + 'music player')
        /* alert(data.feedback) */
        if (data.feedback == 'Well done') {
          console.log('Succeed')
          this.setSucceedMusic(true)
          document.body.style.backgroundColor = '#226d68'
          console.log('this is the value of the js file: ' + this.getSucceedMusic())
          setTimeout(() => {
            this.transition()
          }, 1000)
          const store = useStore()

          this.store.dispatch('updateGameSuccess', { gameIndex: 1, success: true })
        }
      } catch (error) {
        console.error('Error confirming input:', error)
      }
    },
    adjustStyles() {
      const player = document.querySelector('.player')
      const clue = document.querySelector('.instruction1')
      if (!player) return

      const windowsScaling = window.devicePixelRatio || 1
      if (windowsScaling === 1.25) {
        // Windows scaling set to 125%
        player.style.transform = 'scale(1.7)'
        player.style.marginTop = '12%'
      } else {
        // Windows scaling set to 100%
        player.style.transform = 'scale(2.3)'
        player.style.marginTop = '15%'
        clue.style.marginLeft = '3%'
      }
    },
    transition() {
      const element = document.querySelector('#app3')

      // Define the animation timeline
      const timeline = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 3500
      })

      // Add animations to the timeline
      timeline.add({
        targets: element,
        scale: [1, 0],
        opacity: [1, 0],
        translateY: ['0%', '35%', '-10%', '-55%']
      })

      // Stop audio playback
      this.stopAudioPlayback()

      setTimeout(() => {
        this.router.push('/app3')
      }, 3500)
    },

    stopAudioPlayback() {
      this.audio.pause()
      this.isPlaying = false
    },
    goHome() {
      console.log('going home via svg')
      this.router.push('/')
      this.stopAudioPlayback()
    }
  },

  mounted() {
    this.adjustStyles()
    window.addEventListener('resize', this.adjustStyles)

    this.audio.addEventListener('timeupdate', this.updateTime)
    this.audio.addEventListener('loadedmetadata', this.setDuration)
    this.audio.addEventListener('ended', this.nextSong)
    this.audio.addEventListener('error', (error) => {
      console.error('Audio error:', error)
    })
    /* this.playSong(this.currentSongIndex) */
    this.pauseSong(this.currentSongIndex)
  },
  beforeDestroy() {
    this.audio.removeEventListener('timeupdate', this.updateTime)
    this.audio.removeEventListener('loadedmetadata', this.setDuration)
    this.audio.removeEventListener('ended', this.nextSong)
    this.audio.removeEventListener('error', () => {})
    window.removeEventListener('resize', this.adjustStyles)
  }
  // directives: {
  //   vAutoAnimate
  // }
}
</script>

<style scoped>
/* #app3 {
  background-color: #226d68;
} */
#app3,
#app {
  overflow-y: hidden;
  overflow-x: hidden;
}

.svg-logo {
  position: absolute;
  top: 1%;
  right: 0%;
  cursor: pointer;
  transition: all 0.5s ease;
}
.svg-logo:hover {
  transform: translateY(6%);
}
/* svg:hover {
  left: 50%;
} */
.svg-logo path {
  stroke: rgb(0, 0, 0);
  fill: rgb(255, 255, 255);
  /* cursor: pointer; */
}

.music-page {
  /* height: 120vh; */

  background: linear-gradient(205deg, rgba(34, 109, 104, 0.816) 38%, rgba(0, 251, 255, 0.48) 100%),
    url('../assets/ai-generated-bg.png') !important;
  /* animation: gradient-show-light 30s infinite !important; */
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
  background-attachment: fixed !important;
  background-color: #226d68 !important; /* 34, 109, 104, */
  transition: all 0.3s ease;
  height: 100vh;
  overflow-y: hidden;
}
/* .music-page {
  height: 100vh;
  overflow-y: hidden;
  transition: all 0.3s ease;
  background: transparent;
} */
.page-header {
  text-align: center;
  h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    word-spacing: 25px;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
  p {
    opacity: 0;
    letter-spacing: 5px;
    color: #226d68;
  }
}
.dark-mode {
  background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(1, 3, 26, 0.752)),
    url('../assets/ai-generated-bg.png') !important;
  /* animation: gradient-show-dark 30s infinite !important; */
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
  background-attachment: fixed !important;
  transition: all 5s ease;
  color: #fff;
  background-color: #111 !important;
  .controls .prev,
  .controls .next {
    color: #fff;
  }
  h1 {
    color: #8d733a;
  }
  p {
    opacity: 0.3;
  }
  p span {
    color: #8d733a;
    font-weight: bold;
  }
  /* p.instruction1 {
    position: absolute;
    top: 49.6%;
    left: 6%;
  } */
  .hamburger {
    background-color: #8d733a;
    color: #000;
  }
  .playlist {
    color: #6f5b2fc0;
  }
}
.dark-mode-toggle {
  position: fixed;
  bottom: 3%;
  right: 2.5%;
  z-index: 9999;
  padding: 10px 10px;
  border: none;
  font-size: 24px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s ease;
}
.dark-mode-toggle:hover {
  opacity: 1;
  scale: 1.3;
}
.media-player {
  /* scale: 0.2; */
  position: relative;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  width: 100%;
  margin: 0;
  color: #ffffffcf;
}

.playlist-button {
  scale: 1.5;
  margin-left: 10%;
  width: 20%;
  height: 50%;
  /* transform: translateY(50px);
  transform: translateY(50px); */
  transform: translateY(-30px);
}

.playlist {
  position: absolute;
  width: 100%;
  margin-top: 10px;
  color: #ffffff;
  /* background-color: #656464;
  border: 1px solid #ddd; */
  border-radius: 5px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none; */
}

.playlist ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.playlist ul li {
  cursor: pointer;
  margin-bottom: 5px;
}
.list-song-title {
  font-weight: bold;
}
.list-song-artist {
  font-style: italic;
  font-size: small;
}

/*125% scaling*/
.player {
  /* scale: 1.7; */
  /* scale: 2.3; */
  /* margin-top: 10%; */
  /* margin-top: 15%; */
  margin-right: 43%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Media query for 100% scaling */
/* @media screen and (-webkit-min-device-pixel-ratio: 0.75), screen and (min-resolution: 120dpi) {
  .player {
    scale: 2.3;
    margin-top: 15%;
  }
} */

.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.song-details {
  width: 200px;
  text-align: center;
}
.song-image {
  width: 160px;
  height: 160px;
  border-radius: 10px;
}

.progress-bar {
  width: 100%;
  margin-bottom: 40px;
}

.progress-time,
.duration {
  font-size: 0.8rem;
}
.progress-time {
  position: absolute;
  transform: translate(8px, 20px);
}
.duration {
  position: absolute;
  right: 5px;
  transform: translateY(-5px);
}
.progress-slider {
  width: 90%;
  margin: 0 10px;
  cursor: pointer;
  background-color: #000;
}
.progress-slider::-webkit-slider-thumb {
  background-color: #ccc;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
}
.controls {
  position: relative;
  display: flex;
  button {
    color: #0b0b0b;
  }
}

.controls button {
  margin: 0 5px;
}
.hamburger {
  background-color: #000000c7;
  color: #fff;
  font-size: large;
  border-radius: 12px;
  border: 0.2px solid #00000060;

  transition: all 0.3s ease;
}
.hamburger:hover {
  scale: 1.07;
}

.prev,
.next {
  border: none;
  border-radius: 102px;
  background: transparent;
  color: #ffffff !important;
  opacity: 0.6;
  transition: all 0.3s ease;
}
.prev:hover,
.next:hover {
  scale: 1.2;
  opacity: 1;
}
.play-pause {
  border: none;
  padding-bottom: 6px;
  padding-left: 8px;
  padding-right: 6px;
  border-radius: 36px;
  font-size: 30px;
  opacity: 0.8;
  transition: all 0.3s ease;
}
.play-pause:hover {
  scale: 1.05;
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  opacity: 1;
}

input[type='range'] {
  accent-color: rgb(255, 255, 255);
  height: 4px;
  opacity: 0.8;
  transition: all 0.3s all;
}
input[type='range']:hover {
  opacity: 1;
}
.volume {
  scale: 0.5;
  /* cursor: pointer; */
  opacity: 0.3;
  transition: all 0.3s ease;
  width: 70px;
}
.volume-controls {
  scale: 1.5;
  transform: translate(-10px, -100px) rotateZ(-90deg);
  opacity: 0;

  transition: all 0.3s ease;
}
.volume:hover {
  opacity: 0.8;
}
.volume:hover .volume-controls {
  opacity: 1;
}
.volume path {
  fill: #ffffff;
}

.input-player {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-295px);
  z-index: 9999;
  padding: 10px 20px;
  background-color: #6d223a;
  border: 1ex solid none;
  border-top-width: 1.7em;
  margin: 0;
  padding: 0;
  color: #ffffff;
  word-wrap: break-word;
  opacity: 0;
  /* outline: 7px solid #383838; */
  outline: none;
  height: 30px;
  font-size: 17px;
  text-align: center;
  transition: all 0.7s;
  width: 600px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.input-player:hover {
  border-top-width: 0.2em;
  background-color: #226d68;
  opacity: 0.45;
}

.input-player:focus {
  border-top-width: 0.2em;
  background-color: #226d68;
}

.toggleSwitch {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 39, 39);
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
  transform: translate(-1px, -30px);
  overflow: hidden;
}

#checkboxInput {
  display: none;
}

.bell {
  width: 18px;
}

.bell path {
  fill: white;
}

.speaker {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition-duration: 0.3s;
}

.speaker svg {
  width: 18px;
}

.mute-speaker {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 3;
  transition-duration: 0.3s;
}

.mute-speaker svg {
  width: 18px;
}

#checkboxInput:checked + .toggleSwitch .speaker {
  opacity: 0;
  transition-duration: 0.3s;
}

#checkboxInput:checked + .toggleSwitch .mute-speaker {
  opacity: 1;
  transition-duration: 0.3s;
  background-color: red;
}

#checkboxInput:active + .toggleSwitch {
  transform: scale(0.7) translateY(-40px);
}

#checkboxInput:hover + .toggleSwitch {
  background-color: rgb(54, 54, 54);
}
.yellow-success {
  background: #e1a624 !important;
}

/* @keyframes gradient-show-light {
  0% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated-bg.png') !important;
  }
  25% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated3-bg.jpg') !important;
  }
  50% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated2-bg.jpg') !important;
  }
  75% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated5-bg.jpg') !important;
  }
  100% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated4-bg.jpg') !important;
  }
}
@keyframes gradient-show-dark {
  0% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated-bg.png') !important;
  }
  25% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated3-bg.jpg') !important;
  }
  50% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated2-bg.jpg') !important;
  }
  75% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated5-bg.jpg') !important;
  }
  100% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated4-bg.jpg') !important;
  }
} */
.svg-logo {
  z-index: 9999;
}
</style>
