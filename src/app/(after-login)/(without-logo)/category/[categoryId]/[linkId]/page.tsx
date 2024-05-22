import LinkDetailComponent from '../../../_component/link-detail-component';

export default function LinkDetailPage({
  params,
}: {
  params: { categoryId: string; linkId: string };
}) {
  return (
    <LinkDetailComponent
      linkId={parseInt(params.linkId)}
      categoryId={parseInt(params.linkId)}
    />
  );
}
