import Service from '@/service/service';
import { Link, LinkResponse } from '@/model/link';

class LinkService extends Service {
  //get method
  //get link by linkId
  authorization = (accessToken: string) => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
  getLink({ accessToken, linkId }: { accessToken: string; linkId: number }) {
    return this.http.get<LinkResponse>(
      `/links/${linkId}`,
      this.authorization(accessToken)
    );
  }

  //link reminder
  getLinkReminder({ accessToken }: { accessToken: string }) {
    return this.http.get<LinkResponse>(
      `/links/reminder`,
      this.authorization(accessToken)
    );
  }

  //post method
  postLink({
    accessToken,
    autoComplete,
    title,
    summary,
    url,
    categoryId,
  }: {
    accessToken: string;
    autoComplete: boolean;
    title: string;
    summary: string;
    url: string;
    categoryId: number;
  }) {
    return this.http.post<Link>(
      `/links`,
      {
        autoComplete,
        title,
        summary,
        url,
        categoryId,
      },
      this.authorization(accessToken)
    );
  }

  //patch method
  updateLink({
    accessToken,
    title,
    summary,
    url,
    categoryId,
    linkId,
  }: {
    accessToken: string;
    title: string;
    summary: string;
    url: string;
    categoryId: number;
    linkId: number;
  }) {
    return this.http.patch<Link>(
      `/links/${linkId}`,
      {
        title,
        summary,
        url,
        categoryId,
      },
      this.authorization(accessToken)
    );
  }

  //change reading state
  updateLinkStatus({
    accessToken,
    linkId,
  }: {
    accessToken: string;
    linkId: number;
  }) {
    return this.http.patch<Link>(
      `/links/${linkId}/status`,
      undefined,
      this.authorization(accessToken)
    );
  }

  //delete method
  deleteLink({
    accessToken,
    linkId,
    categoryId,
  }: {
    accessToken: string;
    linkId: number;
    categoryId: number;
  }) {
    return this.http.delete<Link>(
      `/links/${linkId}`,
      this.authorization(accessToken)
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LinkService();
