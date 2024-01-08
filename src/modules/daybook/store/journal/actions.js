// export const myAction = async ({commit}) => {

import journalApi from "@/api/journalApi";

// }

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  const entries = [];

  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  console.log(entries);
  commit('setEntries', entries);
};

export const updateEntry = async ({ commit }, entry) => {
  console.log(entry);

  const {date, picture, texto} = entry;
  const dataToSave             = {date, picture, texto};

  const res = await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
  console.log(res);
  commit("updateEntry", {...entry});
};

export const createEntry = async (/*{commit}*/) => {};
