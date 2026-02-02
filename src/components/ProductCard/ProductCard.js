import style from "./productcard.module.css";

export default function ProductCard({ image, title, price, badge }) {
    return (
    <div className={style.cardContainer}>
        <div className={`${style.card}`}>
            <div className={style.imageWrapper}>
                {badge && <span className={style.badge}>{badge}</span>}
                <img src={image} alt={title} />
            </div>

            <div className={style.info}>
                <h3 className={style.title}>{title}</h3>
                <p className={style.price}>${price}</p>
                <button className={style.button}><a target="_blank" href="https://api.whatsapp.com/send/?phone=1144160737&text&type=phone_number&app_absent=0">Consultar</a></button>
            </div>
        </div>
    </div>
    );
}
