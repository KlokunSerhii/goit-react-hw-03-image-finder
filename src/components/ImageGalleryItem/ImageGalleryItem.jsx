import '../styles.css';

const ImageGalleryItem = ({ hits }) => {
  return hits.map(({ id, webformatURL, tags }) => (
    <li key={id} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  ));
};
export default ImageGalleryItem;
