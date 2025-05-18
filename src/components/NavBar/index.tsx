import { ENABLE_YEAR_END_STATISTIC } from '../../Config';
import { GetRoute } from '../../utils/TypeSafeRouting';
import style from './style.module.css';
import { FunctionalComponent, JSX } from 'preact';
import { Text } from 'preact-i18n';
import { Link } from 'preact-router/match';

const Navbar: FunctionalComponent = () => {
  const LinkElement = (textID: string, linkTo: string): JSX.Element => {
    return (
      //preact-router的type沒有設定好
      // @ts-ignore
      <Link href={linkTo} activeClassName={style.active}>
        <Text id={textID}>empty</Text>
      </Link>
    );
  };

  const NavigationLinks = (): JSX.Element => {
    const links = [
      { textID: 'header.home', linkTo: GetRoute({ type: 'home' }) },
      ENABLE_YEAR_END_STATISTIC
        ? {
            textID: 'header.yearEndStatistic',
            linkTo: GetRoute({ type: 'year-end-statistic' }),
          }
        : null,
      {
        textID: 'header.livestreaming',
        linkTo: GetRoute({ type: 'livestreams' }),
      },
      {
        textID: 'header.eventCalendar',
        linkTo: GetRoute({ type: 'event-calendar' }),
      },
      {
        textID: 'header.allVTubers',
        linkTo: GetRoute({ type: 'all-vtubers' }),
      },
    ];

    return (
      <div class={style.navLinks}>
        {links.map((e) =>
          e !== null ? LinkElement(e.textID, e.linkTo) : <></>,
        )}
      </div>
    );
  };

  return (
    <div className={style.navbarContainer}>
      <span className={style.title}>
        <Text id="header.title">Taiwan VTuber Data</Text>
      </span>
      <NavigationLinks />
    </div>
  );
};

export default Navbar;
