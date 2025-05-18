import { ENABLE_ADVERTISEMENT } from '../../Config';
import Advertisement from '../../components/Advertisement';
import DebutVTubersTable from '../../components/LandingTables/DebutVTubers';
import GrowingVTubersTable from '../../components/LandingTables/GrowingVTubers';
import LivestreamsTable from '../../components/LandingTables/Livestreams';
import TopVTubersTable from '../../components/LandingTables/TopVTubers';
import TrendingVTubersTable from '../../components/LandingTables/TrendingVTubers';
import { Dictionary } from '../../i18n/Dictionary';
import '../../style/index.css';
import { GetCurrentNationalitySpan } from '../../utils/NationalityUtils';
import { GetRoute } from '../../utils/TypeSafeRouting';
import style from './style.module.css';
import { FunctionalComponent, JSX } from 'preact';
import { Text } from 'preact-i18n';

export interface HomePageProps {
  dictionary: Dictionary;
}

const HomePage: FunctionalComponent<HomePageProps> = (props: HomePageProps) => {
  if (typeof window !== 'undefined') {
    document.title = `${props.dictionary.header.title}`;
  }

  const LivestreamsSection = (): JSX.Element => {
    const now = new Date();

    return (
      <div class={style.streamingSection}>
        <div>
          <h3>
            <a href={GetRoute({ type: 'livestreams' })}>
              <Text id="header.debutToday">Debut Today</Text>
            </a>
          </h3>
          <LivestreamsTable
            divPrefix="debut"
            delayMs={200}
            modifier="debut-no-title"
            now={now}
          />
        </div>
        <div>
          <h3>
            <a href={GetRoute({ type: 'livestreams' })}>
              <Text id="header.livestreaming">Streaming Now</Text>
            </a>
          </h3>
          <LivestreamsTable
            divPrefix="all"
            delayMs={200}
            modifier="all-no-title"
            now={now}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <h1>
        <Text id="header.title">Taiwan VTuber Data</Text>
        {GetCurrentNationalitySpan()}
      </h1>
      {ENABLE_ADVERTISEMENT ? <Advertisement /> : <></>}
      <LivestreamsSection />
      <div class={style.tableGrid}>
        <div class={style.tableItem}>
          {/*熱門 VTuber 前 10*/}
          <TrendingVTubersTable />
        </div>
        <div class={style.tableItem}>
          {/*近 7 日出道 VTuber*/}
          <DebutVTubersTable />
        </div>
        <div class={style.tableItem}>
          <GrowingVTubersTable dictionary={props.dictionary} />
        </div>
        <div class={style.tableItem}>
          <TopVTubersTable />
        </div>
      </div>
    </>
  );
};

export default HomePage;
