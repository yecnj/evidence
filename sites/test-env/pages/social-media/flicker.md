# Flicker Reproduction


```sql hashtags
SELECT * FROM hashtags
```

<Dropdown name="selected_tag" data={hashtags} label=tag value=id />

{inputs.selected_tag}

<BigValue data={hashtags} value="tag" />
<DataTable data={hashtags}/>

```sql hashtag
SELECT * FROM hashtags WHERE id = ${inputs.selected_tag}
```

<BigValue data={hashtag} value="tag" />
<DataTable data={hashtag}/>

