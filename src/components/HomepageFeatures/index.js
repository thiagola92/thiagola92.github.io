import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Vivo Programando',
    Svg: require('@site/static/img/notebook.svg').default,
  },
  {
    title: 'Acompanho Novidades',
    Svg: require('@site/static/img/software.svg').default,
  },
  {
    title: 'Adoro Jogos',
    Svg: require('@site/static/img/walking.svg').default,
  },
  // {
  //   title: 'Random\nSubjects',
  //   Svg: require('@site/static/img/dice.svg').default,
  // },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
