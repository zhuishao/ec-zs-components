<template>
    <a-form :form="form" :selfUpdate="true" class="search-box-warp">
        <div :class="['search-box-header',toggle?'fold':'']">
            <div class="search-box-list">
                <slot></slot>
            </div>
            <div class="search-box-button-group">
                <a-button size="small" @click="searchBoxParams()" accesskey="s"><a-icon type="search" /></a-button>
                <a-button size="small" @click="reloadForm" accesskey="r"><a-icon type="reload" /></a-button>
                <a @click="toggleBox" v-show="toggle&&eSwitch">
                    <span class="link-a">{{t('ec.zsSearchBox.open')}}
                        <i class="ec-icon-down">
                            <svg viewBox="64 64 896 896" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
                        </i>
                    </span>
                </a>
                <a @click="toggleBox" v-show="!toggle&&eSwitch">
                    <span class="link-a">{{t('ec.zsSearchBox.hide')}}
                        <i class="ec-icon-up">
                            <svg viewBox="64 64 896 896" data-icon="up" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 0 0 140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg>
                        </i>
                    </span>
                </a>
            </div>
        </div>
    </a-form>
</template>

<script>
    import Locale from 'ec-zs-components/src/mixins/locale';
    export default {
        name: 'ZsSearchBox',
        props: {
            // 展开收起功能开关
            eSwitch: {
                type: Boolean,
                default: true,
            },
        },
        mixins: [Locale],
        data() {
            return {
                form: this.$form.createForm(this),
                toggle: true,
            };
        },
        mounted() {
            this.enterSearch();
        },
        methods: {
            enterSearch() {
                document.addEventListener('keyup', (event) => {
                    if (event.code === 'Enter') {
                        const searchDomPosition = document.querySelector('.search-box-list');
                        if (searchDomPosition !== null) {
                            const relativePosition = event.target.compareDocumentPosition(searchDomPosition);
                            if (relativePosition > 8 && relativePosition < 16) {
                                this.searchBoxParams();
                            }
                        }
                    }
                });
            },
            reloadForm() {
                this.form.resetFields();
                console.log(this.form);
                this.$emit('click', this.form.getFieldsValue());
            },
            searchBoxParams() {
                this.$emit('click', this.form.getFieldsValue());
            },
            handleChange(name,value) {
                const obj ={};
                obj[name] = value;
                this.form.setFieldsValue(obj);
            },
            toggleBox() {
                this.toggle = !this.toggle;
            },
        },
    };
</script>
<style scoped>
    .link-a{
        color: #1890ff;
        text-decoration: none;
        background-color: transparent;
        white-space: nowrap;
        outline: none;
        cursor: pointer;
        font-size:14px;
        transition: color .3s;
    }
    .link-a:hover {
        color: #40a9ff;
    }
    .link-a:active {
        color: #096dd9;
    }
    .search-box-warp{
        min-width: 800px;
        margin:12px 16px;
    }
    .search-box-header{
        display: grid;
        grid-auto-rows: auto auto;
    }
    .search-box-header.fold{
        grid-auto-rows: unset;
        grid-template-columns: 1fr auto;
    }

    .search-box-list{
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        column-gap:1em;
        transition: all .3s;
        padding: 16px 16px 8px;
    }
    .fold .search-box-list :nth-child(n+4) {
        display: none;
    }
    .search-box-button-group{
        padding: 0 16px 16px;
        display: flex;
        justify-content: flex-end;
    }
    .search-box-button-group :not(:first-child) {
        margin-left:8px;
    }
    .fold .search-box-button-group{
        padding: 20px 16px;
    }

    @media screen and (max-width: 884px){
        .search-box-header.search-box-header{
            grid-auto-rows: auto auto;
            grid-template-columns: unset;
        }
        .fold .search-box-button-group{
            padding: 0 16px 16px;
        }
    }
    @media screen and (max-width: 757px){
        .fold .search-box-button-group{
            padding: 0 16px 16px;
        }
    }
</style>
