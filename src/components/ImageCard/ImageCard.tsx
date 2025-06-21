import css from './ImageCard.module.css';

export default function ImageCard ({ alt_description, urls, updateModalStateData }) {
	return (
		<div
			className={css.cardWrapper}
			onClick={() => updateModalStateData(urls.regular,alt_description)}
		>
			<img
				className={css.cardImage}
				src={urls.small}
				alt={alt_description}
			/>
			<p className={css.cardDescription}>{alt_description}</p>
		</div>
	);
};

