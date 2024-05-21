import LinkDetailComponent from '../../_component/link-detail-component';

export default function LinkDetailPage({
  params,
}: {
  params: { linkId: string };
}) {
  return <LinkDetailComponent linkId={parseInt(params.linkId)} />;
}
