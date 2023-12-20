import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrap}>
      <div className={styles.notFoundInner}>
        <h1>404 Page Not Found🤔</h1>
      </div>
    </div>
  );
};

export default NotFound;
