import Service from '@/service/service';
import { Link } from '@/model/link';

class LinkService extends Service {
  //get method
  //get link by linkId
  getLink({ linkId }: { linkId: number }) {
    return this.http.get<Link>(`/links/${linkId}`);
  }

  //link reminder
  getLinkReminder() {
    return this.http.get<Link[]>(`/links/reminder`);
  }

  //post method
  postLink({
    autoComplete,
    title,
    summary,
    url,
    categoryId,
  }: {
    autoComplete: boolean;
    title: string;
    summary: string;
    url: string;
    categoryId: number;
  }) {
    return this.http.post<Link>(`/links`, {
      autoComplete,
      title,
      summary,
      url,
      categoryId,
    });
  }

  //patch method
  updateLink({
    title,
    summary,
    url,
    categoryId,
    linkId,
  }: {
    title: string;
    summary: string;
    url: string;
    categoryId: number;
    linkId: number;
  }) {
    return this.http.patch<Link>(`/links/${linkId}`, {
      title,
      summary,
      url,
      categoryId,
    });
  }

  //change reading state
  updateLinkStatus({ linkId }: { linkId: number }) {
    return this.http.patch<Link>(`/links/${linkId}/status`);
  }

  //delete method
  deleteLink({ linkId }: { linkId: number }) {
    return this.http.delete<Link>(`/links/${linkId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LinkService();
