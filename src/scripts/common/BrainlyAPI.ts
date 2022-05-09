import type {
    CommonResponse,
    GetQuestionResponse,
    User
} from "../../typings/brainly"

export default new class BrainlyAPI {
    private legacyURL = 'https://brainly.com/api/28';
    private graphURL = 'https://brainly.com/graphql/us';
    private tokenLong: string;

    constructor() {
        this.SetAuthToken();
    }
    private SetAuthToken() {
        let cookie = document.cookie.split("; ").find(cookie => /\[Token\]\[Long\]/i.test(cookie));
        this.tokenLong = cookie?.split("=")?.pop();
    }

    async Legacy<T>(
        method: "GET" | "POST",
        apiMethod: string,
        body?
    ): Promise<CommonResponse<T>> {
        const res = await fetch(`${this.legacyURL}/${apiMethod}`, {
            method,
            body: method === "GET" ? null : JSON.stringify(body)
        }).then(data => data.json());
      
        if (!res.success) throw Error(res.message || "error");
      
        return res;
    }

    public async GQL(
        query: string, 
        variables?
      ) {
        return await fetch(this.graphURL, {
          method: "POST",
          body: JSON.stringify({ query, variables }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-B-Token-Long": this.tokenLong
          }
        }).then(data => data.json());
    }

    public async GetQuestion(id: number): Promise<GetQuestionResponse> {
        return await this.Legacy("GET", `api_tasks/main_view/${id}`);
    }
    async GetUser(id: number): Promise<CommonResponse<{
        description: any; nick: string; 
        }>> {
        return await this.Legacy("GET", `api_user_profiles/get_by_id/${id}`);
    }
}