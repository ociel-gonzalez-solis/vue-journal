export default {
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layouts/DayBookLayout.vue"
    ),
  children: [
    {
      path     : "",
      name     : "no-entry",
      component: () =>
        import(
          /* webpackChunkName: "NotEntrySelected" */ "@/modules/daybook/views/NotEntrySelected.vue"
        ),
    },
    {
      path     : ":id",
      name     : "entry",
      component: () =>
        import(
          /* webpackChunkName: "EntryView" */ "@/modules/daybook/views/EntryView.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id
        }
      }
    },
  ],
};