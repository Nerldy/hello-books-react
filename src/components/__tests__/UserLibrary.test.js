import React from "react";
import UserLibrary from "../UserComps/UserLibrary";


describe("UserLibrary Component", () => {
		it("should fetch data on component mount", () => {
				const fetchData = sinon.stub().resolves({ data: {} });
				const component = mount(<UserLibrary fetchBookNotReturned={fetchData} />);
				expect(fetchData.callCount).to.equal(1);
		});

		it("should set component state to fetchData", async () => {
				const postBookData = [
						{
								date_created: "Tue, 24 Jul 2018 18:44:13 GMT",
								date_modified: "Mon, 27 Aug 2018 10:53:56 GMT",
								id: 1,
								is_borrowed: true,
								isbn: "0992444721",
								title: "Linda Dunn"
						}
				];
				const fetchData = sinon.stub().resolves({ data: { books: postBookData } });
				const component = await mount(<UserLibrary fetchBookNotReturned={fetchData} />);
				expect(component.state("borrowedBooks")).is.deep.equal(postBookData);
		});
});