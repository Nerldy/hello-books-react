import React from "react";
import UserBooks, { fetchData, postData, deleteData } from "../UserComps/UserBooks";
import API from "../../utils/api";

describe("UserBooks Component", () => {
		it("should fetch data on component mount", () => {
				const fetchData = sinon.stub().resolves({ data: {} });
				const component = mount(<UserBooks fetchData={fetchData} />);
				expect(fetchData.callCount).to.equal(1);
		});

		it("should set component state to fetchData", async () => {
				const postBookData = [
						{
								date_created: "Tue, 24 Jul 2018 18:44:13 GMT",
								date_modified: "Tue, 24 Jul 2018 18:44:13 GMT",
								id: 1,
								is_borrowed: false,
								isbn: "1023075369",
								title: "Tanya Mcneil"
						}
				];
				const fetchData = sinon.stub().resolves({ data: { books: postBookData } });
				const component = await mount(<UserBooks fetchData={fetchData} />);
				expect(component.state("books")).is.deep.equal(postBookData);
		});

		it("should call get endpoint", () => {
				sinon.stub(API, "get");
				fetchData();
				expect(API.get.firstCall.args[0]).to.equal("books");
				API.get.restore();
		});

		it("should call post endpoint", () => {
				sinon.stub(API, "post");
				postData(1);
				expect(API.post.firstCall.args[0]).to.equal("users/books/1");
				API.post.restore();
		});

		it("should call delete endpoint", () => {
				sinon.stub(API, "delete");
				deleteData(1);
				expect(API.delete.firstCall.args[0]).to.equal("books/1");
				API.delete.restore();
		});
});
