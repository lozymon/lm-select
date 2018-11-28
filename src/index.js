import React, {Component} from 'react'
import {List, AutoSizer} from 'react-virtualized';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import styles from './styles.css';

export default class extends Component {
    refLista = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
            listHeight: 300,
            listRowHeight: 40,
            overscanRowCount: 10,
            rowCount: props.list.length,
            scrollToIndex: undefined,
            showScrollingPlaceholder: false,
            useDynamicRowHeight: false,
        };

        this._getRowHeight = this._getRowHeight.bind(this);
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._onRowCountChange = this._onRowCountChange.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._rowRenderer = this._rowRenderer.bind(this);
    }

    handleClickOutside() {
        this.setState({
            listOpen: false
        })
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    _getDatum(index) {
        const {list} = this.context;

        return list.get(index % list.size);
    }

    _getRowHeight({index}) {
        return this._getDatum(index).size;
    }

    _noRowsRenderer() {
        return <div className={styles.noRows}>No rows</div>;
    }

    _onRowCountChange(event) {
        const rowCount = parseInt(event.target.value, 10) || 0;

        this.setState({rowCount});
    }

    _onScrollToRowChange(event) {
        const {rowCount} = this.state;
        let scrollToIndex = Math.min(
            rowCount - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }

        this.setState({scrollToIndex});
    }

    _rowRenderer({index, isScrolling, key, style}) {
        return <div className={styles.row} key={key} style={style}>Item {index}</div>
    }

    render() {
        const {list} = this.props;
        const {
            listOpen,
            headerTitle,
            listHeight,
            listRowHeight,
            overscanRowCount,
            rowCount,
            scrollToIndex,
            showScrollingPlaceholder,
            useDynamicRowHeight,
        } = this.state;

        return (
            <div className="lm-wrapper">
                <div className="lm-header" onClick={() => this.toggleList()}>
                    <div className="lm-header-title">{headerTitle}</div>
                    {listOpen
                        ? <FontAwesomeIcon icon={faArrowUp}/>
                        : <FontAwesomeIcon icon={faArrowDown}/>
                    }
                </div>
                {listOpen && (<AutoSizer disableHeight>
                        {({width}) => (
                            <List
                                height={listHeight}
                                overscanRowCount={overscanRowCount}
                                noRowsRenderer={this._noRowsRenderer}
                                rowCount={rowCount}
                                rowHeight={
                                    useDynamicRowHeight ? this._getRowHeight : listRowHeight
                                }
                                rowRenderer={this._rowRenderer}
                                scrollToIndex={scrollToIndex}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )}
            </div>
        )
    }
}
