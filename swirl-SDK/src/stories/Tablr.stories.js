 import { Tablr  } from "../Tablr";

 export default {
    title: "Tablr - A customizable react table component", 
    component: Tablr,
 }

 const Template = args => <Tablr {...args} / >;

 export const Default = Template.bind({});

 Default.args = {
    rows: [
        ['this', 'is', 'just', 'a', 'test'],
        ['this', 'is', 'also', 'a', 'test'],
        ['just', 'a', 'little', 'more', 'data'],
        ['row', 'number', 'four', 'right', 'here'],
    ],
    headers: ['Col1', 'Col2', 'Col3', 'Col4', 'Col5'],
 };