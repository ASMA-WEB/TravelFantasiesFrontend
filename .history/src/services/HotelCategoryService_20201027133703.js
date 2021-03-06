import GenericService from "./GenericService";

class HotelCategoryService extends GenericService {
  constructor() {
    super();
  }

    AddHotelCategory = (body) =>
    this.post("hotelCategory", body 
      , {
      headers: {
        "Content-Type": "form-data; ",
      },}

    );  
  //deleteProduct = (_id) => this.delete("products/" + _id);
  //updateProduct = (_id, data) => this.put("products/" + _id, data);
  getHotels = (page = 1, perPage = 20) =>
    this.get("hotels?page=" + page + "&perPage=" + perPage).then();

   getSingleHotel = (id) => this.get("hotels/" + id);
}

let hotelCategoryService = new HotelCategoryService();
export default hotelCategoryService;
