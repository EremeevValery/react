var my_news =   [
        {
                author: 'Саша   Печкин',
                text:   'В  четчерг,    четвертого  числа...',
                bigText:    'в  четыре  с   четвертью   часа    четыре  чёрненьких  чумазеньких чертёнка чертили  чёрными чернилами   чертёж.'
        },
        {
                author: 'Просто Вася',
                text:   'Считаю,    что $   должен  стоить  35  рублей!',
                bigText:    'А  евро    42!'
        },
        {
                author: 'Гость',
                text:   'Бесплатно. Скачать.    Лучший  сайт    -   http://localhost:3000',
                bigText:    'На самом   деле    платно, просто  нужно   прочитать   очень   длинное лицензионное соглашение'
        },
];

var Add =   React.createClass({
        getInitialState: function () {
                return {
                    agreeIsNotChecked: true,
                    authorIsEmpty: true,
                    textIsEmpty: true
                };
        },
        componentDidMount:  function()  {
                ReactDOM.findDOMNode(this.refs.author).focus();
        },
        onBtnClickHandler:  function(e) {
                e.preventDefault();
                var author = ReactDOM.findDOMNode(this.refs.author).value;
                var text = ReactDOM.findDOMNode(this.refs.text).value;
                alert(author +'\n'+ text);
        },
        onAgreeChange: function(e) {
                this.setState({agreeIsNotChecked: !this.state.agreeIsNotChecked});
        },
        onAuthorChange: function(e) {
                if(e.target.value.trim().length>0) {
                    this.setState({authorIsEmpty:false})
                }
                else {
                    this.setState({authorIsEmpty:true})
                }
        },
        onTextChange: function(e) {
                if(e.target.value.trim().length>0) {
                    this.setState({textIsEmpty:false})
                }
                else {
                    this.setState({textIsEmpty:true})
                }
        },
        render: function()  {
                return  (
                        <form   className='add  cf'>
                                <input
                                        type='text'
                                        className='add__author'
                                        defaultValue=''
                                        placeholder='Ваше   имя'
                                        ref='author'
                                        onChange={this.onAuthorChange}
                                />
                                <textarea
                                        className='add__text'
                                        defaultValue=''
                                        placeholder='Текст  новости'
                                        ref='text'
                                        onChange={this.onTextChange}
                                ></textarea>
                                <label  className='add__checkrule'>
                                        <input  type='checkbox'
                                        defaultChecked={false}
                                        onChange={this.onAgreeChange}
                                        ref='checkrule' />
                                        Я согласен    с    правилами
                                </label>
                                <button
                                        className='add__btn'
                                        onClick={this.onBtnClickHandler}
                                        ref='alert_button' 
                                        disabled={this.state.agreeIsNotChecked || 
                                        this.state.authorIsEmpty ||
                                        this.state.textIsEmpty}>
                                        Показать    alert
                                </button>
                        </form>
                );
        }
});

var Article =   React.createClass({
        propTypes:  {
                data:   React.PropTypes.shape({
                        author: React.PropTypes.string.isRequired,
                        text:   React.PropTypes.string.isRequired,
                        bigText:   React.PropTypes.string.isRequired
                })
        },
        getInitialState:    function()  {
                return  {
                        visible:    false
                };
        },
        readmoreClick:  function(e) {
                e.preventDefault();
                this.setState({visible: true});
        },
        render: function()  {
                var author  =   this.props.data.author;
                var text    =   this.props.data.text;
                var bigText =   this.props.data.bigText;
                var visible =   this.state.visible;
                return  (
                        <div    className="article">
                                <p  className="news__author">{author}:</p>
                                <p  className="news__text">{text}</p>
                                <a   href="#"  onClick={this.readmoreClick}  className={'news__readmore ' + (visible ?'none':'')}>Подробнее</a>
                                <p  className={"news__big-text "+ (visible ? '':'none')}>{bigText}</p>
                        </div>
                )
        }
});

var News    =   React.createClass({
        propTypes:  {
                data:   React.PropTypes.array.isRequired
        },
        render: function()   {
                var data = this.props.data;
                var newsTemplate;
                let dataLength = data.length;
                if (dataLength > 0) {
                    newsTemplate = data.map(function(item,index) {
                        return  (
                          <div key={index}>
                            <Article data={item} />
                          </div>
                        )
                    })
                }  
                else {
                    newsTemplate=<p>новостей нет!!!!</p>
                }
        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length>0 ? '':'none')}> Вcего новостей = {data.length}</strong>
            </div>
        );
    }
});

var   App =   React.createClass({
        getInitialState: function() {
                return {
                    news: my_news
                };
        },
        componentDidMount: function() {

        },
        componentWillUnmount: function() {

        },
        render: function()  {
                console.log('render');
                return  (
                        <div    className="app">
                            <Add />
                            <h3>Новости</h3>
                            <News data={this.state.news}/>
                        </div>

                );
        }
});

ReactDOM.render(
        <App />,
        document.getElementById('root')
);