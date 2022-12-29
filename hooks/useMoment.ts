import moment from "moment";
import "moment/locale/pt-br";

export const today = moment()
  .locale("pt-br")
  .format("ddd, D [de] MMMM [-] YYYY");

export const formatDate = (date: Date) => {
  return moment(date)
    .locale("pt-bt")
    .format("ddd, D [de] MMMM [-] YYYY");
};
