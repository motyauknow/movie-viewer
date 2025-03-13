import styles from '../MainPage/MainPage.module.css'

function MainPage() {
    return (
    <div className={ styles.search_wrapper }>
        <form className={ styles.search_form }>
          <input
            type="text"
            className={ styles.search_input }
            placeholder='Введите название фильма'
          />
        <button type="submit" className={ styles.search_btn }>Найти</button>
        </form>
    </div>
    );
};

export default MainPage;