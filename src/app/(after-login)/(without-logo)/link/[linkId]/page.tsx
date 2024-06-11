import ErrorBoundary from './_component/ErrorBoundary';
import LinkDetailComponent from './_component/link-detail-component';

export default function LinkDetailPage({
  params,
}: {
  params: { linkId: string };
}) {
  return;
  <ErrorBoundary>
    <LinkDetailComponent linkId={parseInt(params.linkId)} />;
  </ErrorBoundary>;
}
