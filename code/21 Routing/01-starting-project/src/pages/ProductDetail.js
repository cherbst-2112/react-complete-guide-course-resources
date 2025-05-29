import { useParams, Link } from 'react-router-dom'
function ProductDetailPage() {
  const params = useParams();
  return <>
    <h1>details</h1>
    <p>{params.productId}</p>
    <p><Link relative='path' to='..'>Back</Link></p>
  </>
}

export default ProductDetailPage;
