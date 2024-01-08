import axios from "axios";


const journalApi = axios.create({
  baseURL:
    "https://vue-journal-demo-4d782-default-rtdb.firebaseio.com",
});

export default journalApi;