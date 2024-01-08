export default () => ({
  isLoading: true,
  entries  : [
    {
      id     : new Date().getTime(),
      date   : new Date().toDateString(),
      text   : "Occaecat cillum duis enim non dolore aute qui minim minim est. Minim non veniam fugiat Lorem. Anim officia magna fugiat pariatur.",
      picture: null,
    },
    {
      id     : new Date().getTime() + 1000,
      date   : new Date().toDateString(),
      text   : "Sit labore cupidatat anim tempor proident. Eiusmod ullamco magna deserunt voluptate officia cillum exercitation incididunt tempor cillum in enim. Do fugiat officia ullamco veniam cillum. Magna laborum sunt irure cillum nostrud sint voluptate nisi velit ullamco laborum labore officia est.",
      picture: null,
    },
    {
      id     : new Date().getTime() + 2000,
      date   : new Date().toDateString(),
      text   : "Qui adipisicing velit aliqua do esse velit laborum ea qui anim ut. Deserunt nisi duis ullamco officia tempor irure laboris id ad ea nulla. Consequat esse labore aliqua elit duis enim labore est consequat officia. Magna duis est reprehenderit irure quis ullamco exercitation ex reprehenderit.",
      picture: null,
    },
  ],
});
