import React from "react";
import UserBookHistory, { fetchData } from "../UserComps/UserBookHistory";
import API from "../../utils/api";


describe("UserBookHistory Component", () => {

		it("should fetch data on component mount", () => {
				const fetchData = sinon.stub().resolves({ data: {} });
				const component = mount(<UserBookHistory fetchData={fetchData} />);
				expect(fetchData.callCount).to.equal(1);
		});

		it("should set component state to fetchData", async () => {
				const postData = [
						{
								borrow_date: "Thu, 23 Aug 2018 11:38:33 GMT",
								id: 1,
								isbn: "1548169757",
								return_date: "Sat, 25 Aug 2018 08:35:14 GMT",
								title: "Brian Turner"
						}
				];
				const fetchData = sinon.stub().resolves({ data: { books: postData } });
				const component = await mount(<UserBookHistory fetchData={fetchData} />);
				expect(component.state("booksHistory")).is.deep.equal(postData);
		});

		it("should call get endpoint", () => {
				sinon.stub(API, "get");
				fetchData();
				expect(API.get.firstCall.args[0]).to.equal("/users/books");
				API.get.restore();
		});
});